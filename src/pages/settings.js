import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import SEO from "../components/Seo";
import { useSettings, actionTypes } from "../contexts/SettingsContext";
import {
  Switch,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Tooltip,
} from "@material-ui/core/";
import { ArrowBack } from "@material-ui/icons";
import useSpeechSyntesis from "../utils/hooks/useSpeechSynthesis";

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  border-bottom: solid 1px ${({ theme }) => theme.colors.white};

  span {
    font-size: 1.6rem;
  }
`;
const BackButtonContainer = styled(Link)`
  cursor: pointer;
`;
const BackButton = styled(ArrowBack)`
  color: ${({ theme }) => theme.colors.lightBlue};
`;
const SettingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Row = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  padding: 10px;
`;
const SettingName = styled.div`
  font-size: 1.4rem;
  margin-right: 10px;
`;
const StyledSelect = styled(Select)`
  &&& {
    font-size: 1.4rem;
  }
  margin-right: 5px;
`;

const Settings = () => {
  const { settings, dispatch } = useSettings();
  const { speak } = useSpeechSyntesis();
  const toggleTTS = () => {
    dispatch({
      type: actionTypes.TOGGLE_TTS,
    });
  };

  const toggleVibrations = () => {
    dispatch({
      type: actionTypes.TOGGLE_VIBRATIONS,
    });
  };

  const handleVoiceChange = e => {
    dispatch({
      type: actionTypes.SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX,
      payload: e.target.value,
    });
    speak({
      text: "I will be telling you the exercise name",
      voice: settings.speechSynth.voices[e.target.value],
    });
  };

  return (
    <StyledWrapper>
      <SEO title="Settings" />
      <Header>
        <BackButtonContainer to="/">
          <IconButton aria-label="back to overview">
            <BackButton fontSize="large" />
          </IconButton>
        </BackButtonContainer>
        <span>Settings</span>
      </Header>
      <SettingsContainer>
        <Row>
          <SettingName>Vibrations</SettingName>
          <Tooltip
            open={!settings.vibrations}
            title="Vibrate on start/end of the exercise"
            placement="left-end"
          >
            <Switch
              checked={settings.vibrations}
              onChange={toggleVibrations}
              disabled={
                typeof window !== "undefined" &&
                !window.navigator &&
                !window.navigator.vibrate
              }
            />
          </Tooltip>
        </Row>
        <Row>
          <SettingName>Voice synth:</SettingName>
          <Tooltip
            open={!settings.speechSynth.supported}
            title="Not supported in your browser"
            placement="left-end"
          >
            <Switch
              checked={settings.speechSynth.enabled}
              onChange={toggleTTS}
              disabled={
                !settings.speechSynth.supported ||
                !settings.speechSynth.voices.length
              }
            />
          </Tooltip>
        </Row>
        {settings.speechSynth.enabled &&
          settings.speechSynth.voices.length > 0 && (
            <Row>
              <SettingName>Language of speech:</SettingName>
              <StyledSelect
                value={settings.speechSynth.selectedVoiceIndex}
                onChange={handleVoiceChange}
              >
                {settings.speechSynth.voices.map((voice, index) => (
                  <MenuItem key={voice.voiceURI} value={index}>
                    {voice.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Row>
          )}
      </SettingsContainer>
    </StyledWrapper>
  );
};

export default Settings;

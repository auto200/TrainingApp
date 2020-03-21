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
import { settings as settingsTransl, voicePreview } from "../translations";

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
  max-width: 450px;
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
  const toggleVoiceEnabled = () => {
    dispatch({
      type: actionTypes.TOGGLE_VOICE_ENABLED,
    });
  };

  const toggleVibrations = () => {
    dispatch({
      type: actionTypes.TOGGLE_VIBRATIONS,
    });
  };

  const handleLanguageChange = e => {
    dispatch({
      type: actionTypes.SET_CURRENT_LANGUAGE,
      payload: e.target.value,
    });
  };

  const handleVoiceChange = e => {
    dispatch({
      type: actionTypes.SET_SPEECH_SYNTH_SELECTED_VOICE_INDEX,
      payload: e.target.value,
    });
    speak({
      text: voicePreview[settings.currentLanguage],
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
        <span>{settingsTransl.title[settings.currentLanguage]}</span>
      </Header>
      <SettingsContainer>
        <Row>
          <SettingName>
            {settingsTransl.language[settings.currentLanguage]}
          </SettingName>
          <StyledSelect
            value={settings.currentLanguage}
            onChange={handleLanguageChange}
          >
            <MenuItem value={settings.languages.en}>English</MenuItem>
            <MenuItem value={settings.languages.pl}>Polski</MenuItem>
          </StyledSelect>
        </Row>
        <Row>
          <SettingName>
            {settingsTransl.voiceSynth[settings.currentLanguage]}
          </SettingName>
          <Tooltip
            open={!settings.speechSynth.supported}
            title={settingsTransl.notSupported[settings.currentLanguage]}
            placement="left-end"
          >
            <Switch
              checked={settings.speechSynth.enabled}
              onChange={toggleVoiceEnabled}
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
              <SettingName>
                {settingsTransl.languageOfSpeech[settings.currentLanguage]}
              </SettingName>
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
        <Row>
          <SettingName>
            {settingsTransl.vibrations.title[settings.currentLanguage]}
          </SettingName>
          <Tooltip
            open={!settings.vibrations}
            title={settingsTransl.vibrations.tooltip[settings.currentLanguage]}
            placement="left-end"
            style={{ zIndex: 100 }}
          >
            <Switch
              checked={settings.vibrations}
              onChange={toggleVibrations}
              disabled={
                typeof window !== "undefined" &&
                !window.navigator && !window.navigator.vibrate
              }
            />
          </Tooltip>
        </Row>
      </SettingsContainer>
    </StyledWrapper>
  );
};

export default Settings;

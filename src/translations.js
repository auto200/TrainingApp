export const utils = {
  yes: {
    en: "Yes",
    pl: "Tak",
  },
  no: {
    en: "No",
    pl: "Nie",
  },
  add: {
    en: "Add",
    pl: "Dodaj",
  },
  delete: {
    en: "Delete",
    pl: "Usuń",
  },
  cancel: {
    en: "Cancel",
    pl: "Anuluj",
  },
  change: {
    en: "Change",
    pl: "Zmień",
  },
};
export const overview = {
  title: {
    en: "Pump it!",
    pl: "Pompuj!",
  },
  settingsTooltip: {
    en: "Settings",
    pl: "Ustawienia",
  },
};
export const exercisesProfilesManager = {
  title: {
    noProfileSelected: {
      en: "No profile selected",
      pl: "Nie wybrano profilu",
    },
    currentProfile: {
      en: "Current profile:",
      pl: "Wybrany profil:",
    },
  },
  noProfiles: {
    en: "No profiles",
    pl: "Brak profili",
  },
  addPopover: {
    en: "Click to add new profile",
    pl: "Kliknij aby dodać nowy profil",
  },
  iconTitles: {
    edit: {
      en: "Edit profile name",
      pl: "Edytuj nazwę profilu",
    },
    delete: {
      en: "Delete current profile",
      pl: "Usuń wybrany profil",
    },
    add: {
      en: "Add new profile",
      pl: "Dodaj nowy profil",
    },
  },
  dialogs: {
    addNewProfile: {
      title: {
        en: "Add profile",
        pl: "Dodaj profil",
      },
      inputLabel: {
        en: "Name",
        pl: "Nazwa",
      },
      inputPlaceholder: {
        en: "e.g Morning stretching",
        pl: "np. Poranna gimnastyka",
      },
      inputErrors: {
        empty: {
          en: "Please, provide profile name",
          pl: "Proszę, podaj nazwę profilu",
        },
        alreadyExists: {
          en: "This profile already exists",
          pl: "Taki profil już istnieje",
        },
      },
    },
    deleteProfile: {
      title: {
        en: "Delete profile",
        pl: "Usuń profil",
      },
      content: {
        en: "Are You sure You want to delete this profile?",
        pl: "Czy na pewno usunąć ten profil?",
      },
    },
    editProfileName: {
      title: {
        en: "Edit profile name",
        pl: "Zmień nazwę profilu",
      },
      inputLabel: {
        en: "New name",
        pl: "Nowa nazwa",
      },
      inputPlaceholder: {
        en: "e.g Morning stretching",
        pl: "np. Poranna gimnastyka",
      },
      inputErrors: {
        empty: {
          en: "Please, provide profile name",
          pl: "Proszę, podaj nazwę profilu",
        },
        alreadyExists: {
          en: "This profile already exists",
          pl: "Taki profil już istnieje",
        },
      },
    },
  },
};
export const exercisesList = {
  noProfile: {
    en: "^ Create profile ^",
    pl: "^ Utwórz profil ^",
  },
  emptyList: {
    en: "There are no exercises yet. You can add them in the section below!",
    pl: "Nie masz jeszcze żadnych ćwiczeń. Dodaj je poniżej!",
  },
  tooltips: {
    edit: {
      en: "Edit exercise",
      pl: "Edytuj ćwiczenie",
    },
    delete: {
      en: "Delete exercise",
      pl: "Usuń ćwiczenie",
    },
    timings: {
      en: "Train | Rest",
      pl: "Trening | Przerwa",
    },
  },
  dialogs: {
    deleteExercise: {
      title: {
        en: "Delete exercise",
        pl: "Usuń ćwiczenie",
      },
      content: {
        en: "Are you sure you want to delete this exercise?",
        pl: "Czy na pewno chcesz usunąć to ćwiczenie?",
      },
    },
    editExercise: {
      title: {
        en: "Edit exercise",
        pl: "Edytuj ćwiczenie",
      },
    },
  },
};
export const addOrEditExerciseDialog = {
  errors: {
    name: {
      required: {
        en: "Please insert name",
        pl: "Proszę podaj nazwę",
      },
    },
    duration: {
      typeError: {
        en: "Please insert a number",
        pl: "Proszę podaj liczbę",
      },
      required: {
        en: "Please insert duration",
        pl: "Proszę podaj czas",
      },
      integer: {
        en: "Are you scientist?",
        pl: "Co ty naukowiec?",
      },
      moreThan: {
        en: "Pff lame (at least 10s)",
        pl: "Pff słabiutko (minimum 10s)",
      },
    },
    rest: {
      typeError: {
        en: "Please insert a number",
        pl: "Proszę podaj liczbę",
      },
      required: {
        en: "Please insert rest duration",
        pl: "Proszę podaj długość przerwy",
      },
      integer: {
        en: "Are you scientist?",
        pl: "Co ty naukowiec?",
      },
      moreThan: {
        en: "Take it easy champ (at least 5s)",
        pl: "Spokojnie byczku (minimum 5s)",
      },
    },
  },
  labels: {
    name: {
      en: "Exercise name",
      pl: "Nazwa ćwiczenia",
    },
    duration: {
      en: "Duration (s)",
      pl: "Długość serii (s)",
    },
    rest: {
      en: "Rest time (s)",
      pl: "Długość przerwy (s)",
    },
  },
  placeholders: {
    name: {
      en: "e.g Push ups",
      pl: "np. Pompki",
    },
    duration: {
      en: "e.g 30",
      pl: "np. 30",
    },
    rest: {
      en: "e.g 5",
      pl: "np. 5",
    },
  },
  title: {
    add: {
      en: "Add new exercise!",
      pl: "Dodaj nowe ćwiczenie!",
    },
    edit: {
      en: "Edit exercise",
      pl: "Edytuj ćwiczenie",
    },
  },
};
export const training = {
  noProfileError: {
    en: "To start training You need to create plan in the overview section",
    pl: "Aby zacząć trenować musisz stworzyć plan, kieruj się do szatni",
  },
  noExercisesError: {
    en: "You dont have any exercised added yet. Fix it by going to overview!",
    pl:
      "Nie masz jeszcze żadnych dodanych ćwiczeń. Zmień to przechodząc do szatni",
  },
  tapToStart: {
    en: "TAP to begain exercising",
    pl: "DOTKNIJ aby rozpocząć ćwiczenia",
  },
};
export const trainingStarted = {
  prepare: {
    en: "Prepare",
    pl: "Przygotuj się",
  },
  rest: {
    en: "Rest",
    pl: "Przerwa",
  },
};
export const bottomMenu = {
  overwiew: {
    en: "Overview",
    pl: "Szatnia",
  },
  training: {
    en: "Training",
    pl: "Trening",
  },
};
export const settings = {
  title: {
    en: "Settings",
    pl: "Ustawienia",
  },
  language: {
    en: "Language:",
    pl: "Język:",
  },
  notSupported: {
    en: "Not supported in your browser",
    pl: "Nie kompatybilne z twoją przeglądarką",
  },
  voiceSynth: {
    en: "Voice synth:",
    pl: "Syntezator głosu:",
  },
  languageOfSpeech: {
    en: "Language of speech:",
    pl: "Język mowy:",
  },
};
export const voicePreview = {
  en: "I will be telling you the exercise name",
  pl: "Będę ci mówić nazwę ćwiczenia",
};

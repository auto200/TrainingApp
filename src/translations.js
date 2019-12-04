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
  reorderHint: {
    en: "You can reorder exercises!",
    pl: "Możesz zmieniać kolejność ćwiczeń!",
  },
};
export const exercisesPlansManager = {
  selectLabel: {
    noPlanSelected: {
      en: "No plan selected",
      pl: "Nie wybrano planu",
    },
    currentPlan: {
      en: "Current plan:",
      pl: "Wybrany plan:",
    },
  },
  noPlans: {
    en: "No plans",
    pl: "Brak planów",
  },
  iconTitles: {
    edit: {
      en: "Edit plan name",
      pl: "Edytuj nazwę planu",
    },
    delete: {
      en: "Delete current plan",
      pl: "Usuń wybrany plan",
    },
    add: {
      en: "Add new plan",
      pl: "Dodaj nowy plan",
    },
  },
  addNewPlan: {
    en: "Add exercise:",
    pl: "Dodaj ćwiczenie:",
  },
  dialogs: {
    addNewPlan: {
      title: {
        en: "Add plan",
        pl: "Dodaj plan",
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
          en: "Please, provide plan name",
          pl: "Proszę, podaj nazwę planu",
        },
        alreadyExists: {
          en: "This plan already exists",
          pl: "Taki plan już istnieje",
        },
      },
    },
    deletePlan: {
      title: {
        en: "Delete plan",
        pl: "Usuń plan",
      },
      content: {
        en: "Are You sure You want to delete this plan?",
        pl: "Czy na pewno usunąć ten plan?",
      },
    },
    editPlanName: {
      title: {
        en: "Edit plan name",
        pl: "Zmień nazwę planu",
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
          en: "Please, provide plan name",
          pl: "Proszę, podaj nazwę planu",
        },
        alreadyExists: {
          en: "This plan already exists",
          pl: "Taki plan już istnieje",
        },
      },
    },
  },
};
export const exercisesList = {
  noPlan: {
    en: "Create training plan",
    pl: "Utwórz plan treningowy",
  },
  emptyList: {
    en: "This plan doesn't have any exercises yet. You can add them above!",
    pl: "Ten plan nie ma jeszcze żadnych ćwiczeń. Możesz je dodać powyżej!",
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
  noPlanError: {
    en: "To start training You need to create plan in the overview section",
    pl: "Aby zacząć trenować musisz stworzyć plan, kieruj się do szatni",
  },
  noExercisesError: {
    en:
      "You dont have any exercised added yet. Change it by going to overview!",
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

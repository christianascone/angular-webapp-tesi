SURVEY_PERSONAL_DATA_KEY = "PERSONAL_DATA";

SURVEY_FRAMING_EFFECT_KEY = "FRAMING";
SURVEY_CERTAINTY_EFFECT_KEY = "CERTAINTY";
SURVEY_REFLECTION_EFFECT_KEY = "REFLECTION";

// Json object containing the questions for two final surveys
survey_questions = {};

var survey_personal_data = [{
	id: "firstname",
	type: "TEXT",
	options: [{
		label_en: "First Name",
		label_it: "Nome"
	}]
}, {
	id: "lastname",
	type: "TEXT",
	options: [{
		label_en: "Last Name",
		label_it: "Cognome"
	}]
}, {
	question_en: "What's your job?",
	question_it: "Qual è la tua occupazione?",
	id: "job",
	type: "TEXT",
	options: [{
		label_en: "Job",
		label_it: "Occupazione"
	}]
}, {
	question_en: "What's your education level?",
	question_it: "Qual è il tuo titolo di studio?",
	id: "education_level",
	type: "TEXT",
	options: [{
		label_en: "Education level",
		label_it: "Titolo di studio"
	}]
}, {
	id: "age",
	type: "TEXT",
	options: [{
		label_en: "Age",
		label_it: "Età"
	}]
}, {
	question_en: "Gender",
	question_it: "Genere",
	id: "gender",
	type: "RADIO",
	options: [{
		label_en: "Male",
		label_it: "Maschio",
		value: "Male"
	}, {
		label_en: "Female",
		label_it: "Femmina",
		value: "Female"
	}]
}, {
	question_en: "Do you usually play videogames?",
	question_it: "Giochi abitualmente con i videogiochi?",
	id: 5,
	type: "RADIO",
	options: [{
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}, {
		label_en: "No",
		label_it: "No",
		value: "No"
	}]
}, {
	question_en: "Have you played to money games, in the last year?",
	question_it: "Hai svolto giochi a soldi nell'ultimo anno?",
	id: 6,
	type: "RADIO",
	options: [{
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}, {
		label_en: "No",
		label_it: "No",
		value: "No"
	}]
}];
survey_questions[SURVEY_PERSONAL_DATA_KEY] = survey_personal_data;
var survey_framing = [{
	question_en: "At the end of games, do you think you're better than when you started?",
	question_it: "Al termine delle partite svolte, ritieni di essere diventato più bravo rispetto a quando hai cominciato a giocare?",
	id: 1,
	type: "RADIO",
	options: [{
		label_en: "No",
		label_it: "No",
		value: "No"
	}, {
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}]
}, {
	question_en: "Are you satisfied of the points distribution you gained while playing?",
	question_it: "Sei contento dei punti che hai guadagnato durante le partite?",
	id: 2,
	type: "RADIO",
	options: [{
		label_en: "No",
		label_it: "No",
		value: "No"
	}, {
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}]
}, {
	question_en: "How satisfied are you with points distribution from 1 to 5?",
	question_it: "Quanto sei soddisfatto della distribuzione dei punti da 1 a 5?",
	id: 3,
	type: "RADIO",
	options: [{
		label_en: "1",
		label_it: "1",
		value: "1"
	}, {
		label_en: "2",
		label_it: "2",
		value: "2"
	}, {
		label_en: "3",
		label_it: "3",
		value: "3"
	}, {
		label_en: "4",
		label_it: "4",
		value: "4"
	}, {
		label_en: "5",
		label_it: "5",
		value: "5"
	}]
}];
survey_questions[SURVEY_FRAMING_EFFECT_KEY] = survey_framing;
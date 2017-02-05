SurveyResults = new Mongo.Collection('surveyResults');
console.log("Init surveyResults");

/**
 * Create a new result for survey 1 and given user
 * @param  {Int} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey1Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, 1, data);
}

/**
 * Create a new result for survey 2 and given user
 * @param  {Int} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey2Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, 2, data);
}

/**
 * Create a new survey result for userId
 * @param  {Int} userId Id of result's user
 * @param  {Int} index  Index of filled survey (1 or 2)
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurveyResult = function(userId, index, data) {
	var surveyResultsData = {
		userId: userId,
		index: index,
		data: data
	};
	return SurveyResults.insert(surveyResultsData);
};
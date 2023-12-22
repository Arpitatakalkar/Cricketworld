$(document).ready(function () {
    // Function to fetch data from the API with offset
    function fetchFromAPI(apiURL, sectionID, contentID, cb) {
        $.get(apiURL, function (data) {
            if (data.status != "success") {
                alert("Failed to fetch data from the API");
                return;
            }

            let dataArray = data.data;
            if (!dataArray) {
                cb([]);
            } else {
                cb(dataArray);
            }
        });
    }

    // Function to update content
    function updateContent(sectionID, contentID, data) {
        // Update the content of the specified contentID with data
        $("#" + contentID).html(JSON.stringify(data));
    }

    // API URLs
    var currentMatchesAPI = "https://api.cricapi.com/v1/currentMatches?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&offset=0";
    var scoreAPI = "https://api.cricapi.com/v1/cricScore?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6";
    var matchesListAPI = "https://api.cricapi.com/v1/matches?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&offset=0";
    var playersListAPI = "https://api.cricapi.com/v1/players?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&offset=0";

    // Fetch data for Current Matches section
    fetchFromAPI(currentMatchesAPI, "CurrentMatches", "currentMatchesContent", function (data) {
        console.log("Complete data for Current Matches section:", data);
        // Update the content of the Current Matches section
        updateContent("CurrentMatches", "currentMatchesContent", data);
    });

    // Fetch data for Scores section
    fetchFromAPI(scoreAPI, "Scores", "scoresContent", function (data) {
        console.log("Complete data for Scores section:", data);
        // Update the content of the Scores section
        updateContent("Scores", "scoresContent", data);
    });

    // Fetch data for Matches List section
    fetchFromAPI(matchesListAPI, "MatchesList", "matchesListContent", function (data) {
        console.log("Complete data for Matches List section:", data);
        // Update the content of the Matches List section
        updateContent("MatchesList", "matchesListContent", data);
    });

    // Fetch data for Players List section
    fetchFromAPI(playersListAPI, "PlayersList", "playersListContent", function (data) {
        console.log("Complete data for Players List section:", data);
        // Update the content of the Players List section
        updateContent("PlayersList", "playersListContent", data);
    });
});

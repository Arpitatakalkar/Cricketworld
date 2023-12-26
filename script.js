const apiLinks = [
    "https://api.cricapi.com/v1/match_scorecard?apikey=3fd30251-ae08-4327-9191-5597ad0d6971&id=28004108-5cdd-43f7-82f3-f530bf8b2ce9", 
    "https://api.cricapi.com/v1/match_scorecard?apikey=3fd30251-ae08-4327-9191-5597ad0d6971&id=ba2aecba-b908-4e6a-b15e-4ab155b35354",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=33383009-3c99-40f5-82ab-1671a42533b3",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=ab0b5e5e-cbc4-4c60-933f-e9c7c7a0b290",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=7736f02f-c72b-4100-a1c1-000052486f0c",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=34e4e245-f2f9-443d-ba0c-9c9c5115f97f",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=3b28e422-517b-4f6b-99e2-5b9fb21df11c",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=d93a1f48-b292-4a9e-96b6-0a3f24ee6ff1",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=d75177d5-42af-4a73-be4f-1658103808d6",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=ef6c0caf-ef5a-49b0-8428-92c54c5f1ecc",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=bb91a325-eb44-411f-ba99-4fe48c908320",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=dd1d2b04-fc80-4e31-a030-29ae9e42bd8a",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=1b0f4ed9-f033-49de-bd2c-ed1f721826ed",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=7ffd20dc-0dc9-4ff9-87e7-e3f84a69f3a3",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=b5eb178c-086a-4eb6-9859-d9bfff70529a",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=7f42854c-e28d-4a7e-acde-f6c8a4a44293",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=0cbabc31-ef45-45a0-b158-1440699ec844",
    "https://api.cricapi.com/v1/match_scorecard?apikey=c7ed0d02-47dc-4143-9aa7-cd38a3211ac6&id=55725015-7284-4b25-a506-2dd104702ddc",
    "https://api.cricapi.com/v1/match_scorecard?apikey=3fd30251-ae08-4327-9191-5597ad0d6971&id=54eab4d0-6972-4d55-aa65-5278525ababa",
    "https://api.cricapi.com/v1/match_scorecard?apikey=3fd30251-ae08-4327-9191-5597ad0d6971&id=42fb8e23-54f1-4c8e-863e-51131af5deb5 "
  ];
  
  // Function to fetch data from API link
async function fetchData(apiLink) {
  try {
      const response = await fetch(apiLink);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(`Error fetching data from ${apiLink}`, error);
      return null;
  }
}

// Function to process match data
function processMatchData(matchData) {
  const matchInfo = {
      matchType: matchData?.data?.matchType || "N/A",
      status: matchData?.data?.status || "N/A",
      venue: matchData?.data?.venue || "N/A",
      scorecardApi: matchData?.data?.scorecard || "", // Assuming the API link for the scorecard is present in the data
  };

  const teamDetails = (matchData?.data?.teams || []).map((team) => ({
      name: team,
      shortname: matchData?.data?.teamInfo.find((info) => info.name === team)?.shortname || "N/A",
  }));

  return {
      matchInfo,
      teamDetails,
  };
}

// Function to create a match card element
function createMatchCard(index, matchInfo, teamDetails) {
  const matchCard = document.createElement("div");
  matchCard.classList.add("match-card");

  const matchInfoElement = document.createElement("p");
  matchInfoElement.textContent = `Match ${index + 1} - Type: ${matchInfo.matchType}, Status: ${matchInfo.status}, Venue: ${matchInfo.venue}`;
  matchCard.appendChild(matchInfoElement);

  const teamList = document.createElement("ul");
  teamDetails.forEach((team) => {
      const teamItem = document.createElement("li");
      teamItem.textContent = `Team: ${team.name}, Shortname: ${team.shortname}`;
      teamList.appendChild(teamItem);
  });

  matchCard.appendChild(teamList);

  // Button for calculating scores
  const calculateButton = document.createElement("button");
  calculateButton.textContent = "Calculate Scores";
  calculateButton.addEventListener("click", async () => {
      const scorecardData = await fetchData(matchInfo.scorecardApi);
      if (scorecardData) {
          const scores = calculateScores(scorecardData);
          alert(`Batsman Score: ${scores.batsman}, Bowler Score: ${scores.bowler}, Fielder Score: ${scores.fielder}`);
      } else {
          alert("Failed to fetch scorecard data");
      }
  });

  matchCard.appendChild(calculateButton);

  return matchCard;
}

// Function to calculate scores based on scorecard data
function calculateScores(scorecardData) {
  // Logic to calculate scores based on your requirements
  // For demonstration, let's assume some scoring logic and calculate random scores
  const batsmanScore = Math.floor(Math.random() * 100);
  const bowlerScore = Math.floor(Math.random() * 50);
  const fielderScore = Math.floor(Math.random() * 30);

  return {
      batsman: batsmanScore,
      bowler: bowlerScore,
      fielder: fielderScore,
  };
}

// Function to update the HTML with processed data
function updateHTML(data) {
  const matchesList = document.getElementById("matches-list");
  matchesList.innerHTML = ""; // Clear existing content

  data.forEach((matchData, index) => {
      const matchCard = createMatchCard(index, matchData.matchInfo, matchData.teamDetails);
      matchesList.appendChild(matchCard);
  });
}

// Function to fetch data from API link on container click
async function fetchDataOnClick(apiLink) {
  try {
      const response = await fetch(apiLink);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(`Error fetching data from ${apiLink}`, error);
      return null;
  }
}

// Event listener for container click
const matchesListContainer = document.getElementById("matches-list");
matchesListContainer.addEventListener("click", async () => {
  try {
      const result = await processMultipleLinks(apiLinks);
      updateHTML(result);
  } catch (error) {
      console.error("Error processing multiple links", error);
  }
});

// Initial load of data
processMultipleLinks(apiLinks)
  .then((result) => {
      updateHTML(result);
  })
  .catch((error) => {
      console.error("Error processing multiple links", error);
  });

// Function to process match data for multiple API links
async function processMultipleLinks(apiLinks) {
  const processedData = [];

  for (const apiLink of apiLinks) {
      const linkData = await fetchData(apiLink);

      if (linkData) {
          const processedMatchData = processMatchData(linkData);
          processedData.push(processedMatchData);
      }
  }

  return processedData;
}  
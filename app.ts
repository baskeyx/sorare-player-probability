import { GraphQLClient } from "graphql-request";

const app = async () => {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql");
  const players: string[] = ["lucas-digne", "paulo-bruno-exequiel-dybala"];
  for (const slug of players) {
    const query1 = `
      query GetNextGame($slug: String!) {
        football {
          player (slug: $slug) {
            futureGames (first: 1) {
              nodes {
                id
              }
            }
          }
        }
      }`;
    const response1 = await graphQLClient.request(query1, {
      slug,
    });
    const { nodes: games } = response1?.football?.player.futureGames;
    const { id } = games[0];
    const gameId = id.replaceAll("Game:", "");
    if (id) {
      const query2 = `
        query GetNextGamePercentages($slug: String!, $gameId: ID!) {
	        football {
            player (slug: $slug) {
              so5Score (gameId: $gameId) {
                playerGameStats {
                  footballPlayingStatusOdds {
                    starterOddsBasisPoints
                    substituteOddsBasisPoints
                    nonPlayingOddsBasisPoints
                  }
                }
              }
            }
          }
        }`;
      const response2 = await graphQLClient.request(query2, {
        slug,
        gameId,
      });
      const { footballPlayingStatusOdds } =
        response2.football.player.so5Score.playerGameStats;
      if (footballPlayingStatusOdds) {
        const {
          starterOddsBasisPoints,
          substituteOddsBasisPoints,
          nonPlayingOddsBasisPoints,
        } = footballPlayingStatusOdds;
        console.log(
          starterOddsBasisPoints / 10000,
          substituteOddsBasisPoints / 10000,
          nonPlayingOddsBasisPoints / 10000
        );
      }
    }
  }
};

app();

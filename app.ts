import { GraphQLClient } from "graphql-request";
import * as dotenv from "dotenv";
dotenv.config();
const { SRJWT, SRAPIKEY } = process.env;

const app = async () => {
  const graphQLClient = new GraphQLClient("https://api.sorare.com/graphql", {
    headers: {
      Authorization: `${SRJWT}`,
      APIKEY: SRAPIKEY,
    },
  });
  const players: string[] = ["lucas-digne", "paulo-bruno-exequiel-dybala"];
  for (const slug of players) {
    const query = `
      query GetNextGame($slug: String!) {
        football {
          player (slug: $slug) {
            futureGames (first: 1) {
              nodes {
                id
                so5Score (playerSlug: $slug) {
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
          }
        }
      }`;
    const response = await graphQLClient.request(query, {
      slug,
    });
    const { nodes: games } = response?.football?.player.futureGames;
    const { footballPlayingStatusOdds } = games[0].so5Score.playerGameStats;
    console.log(footballPlayingStatusOdds);
  }
};

app();

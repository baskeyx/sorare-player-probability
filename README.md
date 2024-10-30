# Sorare%

Sorare recently introduced a footballPlayingStatusOdds attribute which allows you to extract the probability that a player will be in the starting lineup, bench etc. At the time of writing this Sorare imports this data from SorareData.

At present this is not very performant, you have to run two requests per player, firstly to get the ID of the players upcoming game and secondly to get the percentages. I have made this slightly more performant in another application where I check to see if any players play for the same team I can then reduce the number of game requests, however, with internationals this also becomes an issue.

To run this build amend the players to their Sorare slugs (or change the input to point to your cards).

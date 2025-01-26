package com.capstone.teams.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.teams.entity.Team;
import com.capstone.teams.repository.TeamRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TeamService {

    public static Long id = 0l;

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserServiceClient userServiceClient;

    public Mono<Void> createTeamsForMatch(String matchId, List<String> teamNames, int teamSize) {
        if (teamNames.size() != 2) {
            return Mono.error(new IllegalArgumentException("Exactly two team names must be provided."));
        }
    
        // Create the first team
        Team team1 = new Team();
        team1.setId(id); // Ensure this matches your Team entity's field and method names
        id++;
        team1.setMatchId(matchId);
        team1.setTeam(new HashMap<String,List<Integer>>());
        team1.setTeamSize(teamSize);
        team1.setTeamName(teamNames.get(0));
    
        // Create the second team
        Team team2 = new Team();
        team2.setId(id); // Ensure this matches your Team entity's field and method names
        id++;
        team2.setMatchId(matchId);
        team2.setTeam(new HashMap<String,List<Integer>>());
        team2.setTeamSize(teamSize);
        team2.setTeamName(teamNames.get(1));
    
        // Save both teams to the repository
        return teamRepository.saveAll(List.of(team1, team2)).then();
    }
    

    // public Mono<Team> registerUser(String matchId, String userId, String choice) {
    //     return teamRepository.findAllByMatchId(matchId)
    //             .filter(team -> {
    //                 // Check if the chosen team has space based on the teamName and teamSize
    //                 if (choice.equals("Team A") && team.getTeamName().equals("Team A")) {
    //                     return team.getTeam().size() < team.getTeamSize(); // Check if Team A has space
    //                 } else if (choice.equals("Team B") && team.getTeamName().equals("Team B")) {
    //                     return team.getTeam().size() < team.getTeamSize(); // Check if Team B has space
    //                 }
    //                 return false; // If neither team has space, return false
    //             })
    //             .next() // Get the first team with space
    //             .flatMap(team -> {
    //                 // Add user to the chosen team
    //                 if (choice.equals("Team A") && team.getTeamName().equals("Team A")) {
    //                     team.getTeam().put(userId, new ArrayList<Integer>()); // Add the user to Team A
    //                     userServiceClient.updateTeam(userId, team.getId().toString()); // Update the user's team ID in the database
    //                 } else if (choice.equals("Team B") && team.getTeamName().equals("Team B")) {
    //                     team.getTeam().put(userId, new ArrayList<Integer>()); // Add the user to Team B
    //                     userServiceClient.updateTeam(userId, team.getId().toString()); // Update the user's team ID in the database
    //                 }
    //                 return teamRepository.save(team); // Save the updated team

    //             }).switchIfEmpty(Mono.error(new RuntimeException("No available teams for match: " + matchId)));
    // }

    // ... existing code ...

public Mono<Team> registerUser(String matchId, String userId, String choice) {
    return teamRepository.findAllByMatchId(matchId)
            .filter(team -> {
                if (choice.equals("Team A") && team.getTeamName().equals("Team A")) {
                    return team.getTeam().size() < team.getTeamSize();
                } else if (choice.equals("Team B") && team.getTeamName().equals("Team B")) {
                    return team.getTeam().size() < team.getTeamSize();
                }
                return false;
            })
            .next()
            .flatMap(team -> {
                // Add user to the chosen team
                if ((choice.equals("Team A") && team.getTeamName().equals("Team A")) ||
                    (choice.equals("Team B") && team.getTeamName().equals("Team B"))) {
                    team.getTeam().put(userId, new ArrayList<Integer>());
                    
                    // First update the team in the database
                    return teamRepository.save(team)
                            // Then update the user's team ID
                            .flatMap(savedTeam -> 
                                userServiceClient.updateTeam(userId, savedTeam.getId().toString())
                                    .thenReturn(savedTeam)
                            );
                }
                return Mono.just(team);
            })
            .switchIfEmpty(Mono.error(new RuntimeException("No available teams for match: " + matchId)));
    }

// ... existing code ...
    public Flux<Team> getTeamDetails(String matchId) {
        return teamRepository.findAllByMatchId(matchId);
    }
}

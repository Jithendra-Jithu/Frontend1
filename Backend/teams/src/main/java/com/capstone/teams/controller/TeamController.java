package com.capstone.teams.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.teams.dto.TeamCreationRequest;
import com.capstone.teams.entity.Team;
import com.capstone.teams.service.TeamService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    
    @Autowired
    private TeamService teamService;
    
    @PostMapping("/create-for-match")
    public Mono<Void> createTeamsForMatch(@RequestBody TeamCreationRequest request) {
        return teamService.createTeamsForMatch(request.getMatchId(), request.getTeamNames(), request.getTeamSize());
    }


    @PutMapping("/register")
    public Mono<Team> registerUser(@RequestParam String matchId, @RequestParam String userId, @RequestParam String choice) {
        return teamService.registerUser(matchId, userId, choice);
    }

    @GetMapping("/{matchId}")
    public Flux<Team> getTeamDetails(@PathVariable String matchId) {
        return teamService.getTeamDetails(matchId);
    }

}

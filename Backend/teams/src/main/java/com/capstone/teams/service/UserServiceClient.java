package com.capstone.teams.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class UserServiceClient {

    private final WebClient webClient;

    public UserServiceClient(@Value("${team.service.url}") String teamServiceUrl, WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(teamServiceUrl).build();
    }

    public Mono<Object> getUserDetails(String userId) {
        return webClient.get()
                .uri("/api/users/userId/{userId}", userId)
                .retrieve()
                .bodyToMono(Object.class);
    }

    public Mono<Void> updateTeam(String userId, String teamId) {
        return webClient.put()
                .uri("/api/users/updateTeam/{userId}/{teamId}", userId, teamId)
                .retrieve()
                .bodyToMono(Void.class);
    }
}
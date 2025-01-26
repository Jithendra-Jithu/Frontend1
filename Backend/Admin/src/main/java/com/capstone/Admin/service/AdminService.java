package com.capstone.Admin.service;

import com.capstone.Admin.dto.UserDTO;
import com.capstone.Admin.dto.TrainerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AdminService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    private final String trainerServiceUrl = "http://localhost:8083/api/trainer";

    // Create a new trainer
    public Mono<TrainerDTO> createTrainer(TrainerDTO trainerDTO) {
        // Create WebClient instance from the builder
        WebClient webClient = webClientBuilder.baseUrl(trainerServiceUrl).build();

        // Use the post method on the WebClient instance
        return webClient.post()
                .bodyValue(trainerDTO)  // Send trainerDTO as request body
                .retrieve()  // Retrieve the response
                .bodyToMono(TrainerDTO.class);  // Convert response to TrainerDTO
    }

    // Get all users
    public Mono<UserDTO[]> getAllUsers() {
        // Create WebClient instance
        String userServiceUrl = "http://localhost:8082/users";
        WebClient webClient = webClientBuilder.baseUrl(userServiceUrl).build();

        return webClient.get()  // Use the GET method on the WebClient instance
                .retrieve()  // Retrieve the response
                .bodyToMono(UserDTO[].class);  // Convert response to an array of UserDTO
    }

    // Get all trainers
    public Mono<TrainerDTO[]> getAllTrainers() {
        // Create WebClient instance
        WebClient webClient = webClientBuilder.baseUrl(trainerServiceUrl).build();

        return webClient.get()  // Use the GET method on the WebClient instance
                .retrieve()  // Retrieve the response
                .bodyToMono(TrainerDTO[].class);  // Convert response to an array of TrainerDTO
    }


    // Get trainers by city
    public Mono<TrainerDTO[]> getTrainersByCity(String city) {
        // Create WebClient instance
        WebClient webClient = webClientBuilder.baseUrl(trainerServiceUrl).build();

        return webClient.get()  // Use the GET method
                .uri("/search?city={city}", city)  // Pass the city as a parameter
                .retrieve()  // Retrieve the response
                .bodyToMono(TrainerDTO[].class);  // Convert response to an array of TrainerDTO
    }
}

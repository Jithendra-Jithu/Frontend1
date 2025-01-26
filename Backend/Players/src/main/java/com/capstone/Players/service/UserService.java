package com.capstone.Players.service;

import com.capstone.Players.dto.BattingStatsDTO;
import com.capstone.Players.dto.BowlingStatsDTO;
import com.capstone.Players.dto.OrganizerDTO;
import com.capstone.Players.dto.PlayerStatsDTO;
import com.capstone.Players.model.User;
import com.capstone.Players.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Mono<Boolean> authenticate(String username, String password) {
        return userRepository.findByUserName(username)
            .map(user -> passwordEncoder.matches(password, user.getPassword()))
            .defaultIfEmpty(false);
    }
    

    // Create a new user
    public Mono<User> createUser(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Update existing user
    public Mono<User> updateUser(String userId, User user) {
        return userRepository.findById(userId)
                .flatMap(existingUser -> {
                    existingUser.setUserName(user.getUserName());
                    existingUser.setUserEmail(user.getUserEmail());
                    existingUser.setUserTeamId(user.getUserTeamId());
                    existingUser.setTotalScore(user.getTotalScore());
                    existingUser.setTotalWickets(user.getTotalWickets());
                    existingUser.setTotalMatches(user.getTotalMatches());
                    existingUser.setHighestScore(user.getHighestScore());
                    existingUser.setHighestWickets(user.getHighestWickets());
                    existingUser.setNumberOfMatchesOrganized(user.getNumberOfMatchesOrganized());
                    existingUser.setNumberOfSupportStaff(user.getNumberOfSupportStaff());
                    existingUser.setNumberOfSponsors(user.getNumberOfSponsors());
                    return userRepository.save(existingUser);
                });
    }

    public Mono<User> updateTeamId(String userId, String teamId) {
        return userRepository.findById(userId)
                .flatMap(user -> {
                    user.setUserTeamId(teamId);
                    return userRepository.save(user);
                });
    }

    // Find user by email
    public Mono<User> findByUserEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }


    // Retrieve player stats
    public Mono<PlayerStatsDTO> getPlayerStats(String userId) {
        return userRepository.findById(userId)
                .map(user -> new PlayerStatsDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getTotalScore(),
                        user.getTotalWickets(),
                        user.getTotalMatches(),
                        user.getHighestScore(),
                        user.getHighestWickets(),
                        user.getCurrentScore(),
                        user.getCurrentWickets()
                ));
    }
    public Mono<BattingStatsDTO> getBattingStats(String userId) {
        return userRepository.findById(userId)
                .map(user -> new BattingStatsDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getTotalScore(), // total runs
                        user.getTotalMatches(),
                        user.getHighestScore()
                ));
    }

    // Method to retrieve Bowling Stats
    public Mono<BowlingStatsDTO> getBowlingStats(String userId) {
        return userRepository.findById(userId)
                .map(user -> new BowlingStatsDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getTotalMatches(),
                        user.getTotalWickets(),
                        user.getHighestWickets()
                ));
    }

    // Method to retrieve Organizer Stats
    public Mono<OrganizerDTO> getOrganizerStats(String userId) {
        return userRepository.findById(userId)
                .map(user -> new OrganizerDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getNumberOfMatchesOrganized(),
                        user.getNumberOfSponsors(),
                        user.getNumberOfSupportStaff()
                ));
    }

    public Mono<User> updatePlayerStats(String userId, PlayerStatsDTO playerStatsDTO) {
        return userRepository.findById(userId)
                .flatMap(user -> {
                    // Update player stats
                    user.setTotalScore(playerStatsDTO.getTotalScore());
                    user.setTotalMatches(playerStatsDTO.getTotalMatches());
                    user.setHighestScore(playerStatsDTO.getHighestScore());
                    user.setTotalWickets(playerStatsDTO.getTotalWickets());
                    user.setHighestWickets(playerStatsDTO.getHighestWickets());

                    return userRepository.save(user);
                });
    }

    public Mono<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public Mono<User> findByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }
}

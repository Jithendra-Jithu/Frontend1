package com.capstone.teams.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerRegisterDTO {
    private String matchId;
    private String userId;
    private String userName;
    private String teamName;
    private List<String> positions;
}

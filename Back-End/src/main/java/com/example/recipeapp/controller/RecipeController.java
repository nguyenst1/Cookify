package com.example.recipeapp.controller;

import java.util.HashMap;
import java.util.Optional;
import java.util.logging.Logger;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.recipeapp.persistence.RecipeOps;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class RecipeController {
    private static final Logger LOG = Logger.getLogger(RecipeController.class.getName());
    private RecipeOps recipeOps;

    public RecipeController(RecipeOps recipeOps) {
        this.recipeOps = recipeOps;
    }

    @GetMapping("/recipe")
    public ResponseEntity<String> getRecipe(@RequestParam("food_item") String foodItem,
            @RequestParam(value = "food_servings", required = false) Integer servings) throws Exception {
        if (servings == null) {
            servings = 1;
        }
        return new ResponseEntity<>(recipeOps.getRecipe(foodItem, servings).toString(), HttpStatus.OK);
    }

    @GetMapping("/recipe/instruction/image")
    public ResponseEntity<String> getRecipeImage(@RequestParam("food_instruction") String foodInstruction)
            throws Exception {
        return new ResponseEntity<>(recipeOps.getImage(foodInstruction).toString(), HttpStatus.OK);
    }
}

package com.example.recipeapp.controller;

import java.util.logging.Logger;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.recipeapp.persistence.RecipeOps;

@RestController
@RequestMapping("/")
public class RecipeController {
    private static final Logger LOG = Logger.getLogger(RecipeController.class.getName());
    private RecipeOps recipeOps;

    public RecipeController(RecipeOps recipeOps){
        this.recipeOps = recipeOps;
    }

    @GetMapping("/recipe")
    public ResponseEntity<JSONObject> getRecipe(@RequestParam("food_item") String foodItem) throws Exception {
        JSONObject response  = new JSONObject().put("response", recipeOps.getRecipe(foodItem));
       return new ResponseEntity<>(response, HttpStatus.OK);    
    }
}

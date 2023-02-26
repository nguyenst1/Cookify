package com.example.recipeapp.controller;

import org.json.JSONObject;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.recipeapp.persistence.RecipeOps;
import com.example.recipeapp.persistence.UserOps;

@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/")
public class RecipeController {
    private RecipeOps recipeOps;
    private UserOps userOps;

    public RecipeController(RecipeOps recipeOps, UserOps userOps) {
        this.recipeOps = recipeOps;
        this.userOps = userOps;
    }

    @GetMapping("/recipe")
    public ResponseEntity<String> getRecipe(@RequestParam("food_item") String foodItem,
            @RequestParam(value = "food_servings", required = false) Integer servings) throws Exception {
        if (servings == null) {
            servings = 1;
        }
        JSONObject response =recipeOps.getRecipe(foodItem, servings);
        if(response.has("error_code")){
            return new ResponseEntity<>(response.toString(), HttpStatus.PRECONDITION_FAILED);
        }else{
            return new ResponseEntity<>(response.toString(), HttpStatus.OK);
        }
    }

    @GetMapping("/recipe/instruction/image")
    public ResponseEntity<String> getRecipeImage(@RequestParam("food_instruction") String foodInstruction)
            throws Exception {
        return new ResponseEntity<>(recipeOps.getImage(foodInstruction).toString(), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody JSONObject credentials) throws Exception{
        if(!(credentials.has("email") && credentials.has("password")) && (credentials.has("username"))){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        JSONObject userData = userOps.registerUser(credentials.getString("email"), credentials.getString("username"), credentials.getString("password"));
        return new ResponseEntity<>(userData.toString(), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateUser(@RequestBody JSONObject credentials){
        if(!credentials.has("password") && !(credentials.has("username") || credentials.has("email"))){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        Boolean isAuthenticated = false;
        String userId = "";
        if(credentials.has("username")){
            isAuthenticated = userOps.authenticateUser(credentials.getString("username"), credentials.getString("password"), false);
            if(isAuthenticated){
                userId = userOps.getUserId(credentials.getString("username"), false);
            }
        }else  if(credentials.has("email")){
            isAuthenticated = userOps.authenticateUser(credentials.getString("email"), credentials.getString("password"), true);
            if(isAuthenticated){
                userId = userOps.getUserId(credentials.getString("email"), true);
            }
        }
        return isAuthenticated ? new ResponseEntity<>(new JSONObject().put("user_id", userId).toString() ,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}

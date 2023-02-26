package com.example.recipeapp.controller;

import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
            @RequestParam(value = "food_servings", required = false) Integer servings,
            @RequestHeader Object userId) throws Exception {
        if(!userOps.isUserExists(userId.toString())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        
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
    public ResponseEntity<String> getRecipeImage(@RequestParam("food_instruction") String foodInstruction, @RequestHeader Object userId)
            throws Exception {
        if(!userOps.isUserExists(userId.toString())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(recipeOps.getImage(foodInstruction).toString(), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody HashMap<String, String> credentials) throws Exception{
        if(!(credentials.containsKey("email") && credentials.containsKey("password")) && (credentials.containsKey("username"))){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        JSONObject userData = userOps.registerUser(credentials.get("email"), credentials.get("username"), credentials.get("password"));
        return new ResponseEntity<>(userData.toString(), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticateUser(@RequestBody HashMap<String, String> credentials){
        if(!credentials.containsKey("password") && !(credentials.containsKey("username") || credentials.containsKey("email"))){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        Boolean isAuthenticated = false;
        String userId = "";
        String username = "";
        if(credentials.containsKey("username")){
            isAuthenticated = userOps.authenticateUser(credentials.get("username"), credentials.get("password"), false);
            if(isAuthenticated){
                userId = userOps.getUserId(credentials.get("username"), false);
                username = userOps.getUserName(credentials.get("username"), false);
            }
        }else  if(credentials.containsKey("email")){
            isAuthenticated = userOps.authenticateUser(credentials.get("email"), credentials.get("password"), true);
            if(isAuthenticated){
                userId = userOps.getUserId(credentials.get("email"), true);
                username = userOps.getUserName(credentials.get("username"), false);
            }
        }
        return isAuthenticated ? new ResponseEntity<>(new JSONObject().put("user_id", userId).put("username", username).toString() ,HttpStatus.OK) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}

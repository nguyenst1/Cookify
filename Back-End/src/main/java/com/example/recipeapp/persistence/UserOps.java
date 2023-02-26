package com.example.recipeapp.persistence;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.example.recipeapp.db_utils.UserUtils;

@Component
public class UserOps {
    private UserUtils userUtils;

    public UserOps(UserUtils userUtils){
        this.userUtils = userUtils;
    }
    public JSONObject getUser(String data, Boolean isEmail){
        JSONArray userData = new JSONArray();
        if(isEmail){
            userData = userUtils.getUserByConditions(data, null, null);
        }else{
            userData = userUtils.getUserByConditions(null, data, null);
        }
        return !userData.isEmpty() ? userData.getJSONObject(0) : new JSONObject();
    }
    public String getUserId(String data, Boolean isEmail){
        JSONArray userData = new JSONArray();
        if(isEmail){
            userData = userUtils.getUserByConditions(data, null, null);
        }else{
            userData = userUtils.getUserByConditions(null, data, null);
        }
        return !userData.isEmpty() ? userData.getJSONObject(0).getString("id") : null;
    }
    public Boolean authenticateUser(String data, String password, Boolean isEmail) {
        return !isEmail ? !userUtils.getUserByConditions(null, data, password).isEmpty() : !userUtils.getUserByConditions(data, null, password).isEmpty();
    }
    public JSONObject registerUser(String email, String userName, String password) throws Exception {
        if(authenticateUser(email, password, true)){
            if(userUtils.createUser(email, userName, password)){
                JSONArray userData = userUtils.getUserByConditions(email, userName, password);
                if(!userData.isEmpty()){
                    return userData.getJSONObject(0);
                }
            }

        }
        return null;
    }
}

package com.example.recipeapp.persistence;

import org.json.JSONObject;

public class UserOps {
    public JSONObject authenticateUser(String userName, String password) {
        return null;
    }
    public JSONObject registerUser(String email, String password) {
        if(authenticateUser(email, password) != null){
            return null;
        }
        // UserUtils.insertUserData(userName, password, type);
        // User user = UserUtils.getUserDetails(userName, password);
        // new NotificationsOps().updateNotificationOnUserRegister(user.getId());
        // return user;
        return null;
    }
}

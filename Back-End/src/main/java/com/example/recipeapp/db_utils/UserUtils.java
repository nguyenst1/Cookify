package com.example.recipeapp.db_utils;

import com.example.recipeapp.utils.PasswordEncryptor;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.ConnectionString;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Updates;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.logging.Logger;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static com.mongodb.client.model.Filters.eq;

@Component
public class UserUtils {
  private static final Logger LOG = Logger.getLogger(UserUtils.class.getName());
  private MongoCollection<Document> collection;
  PasswordEncryptor passwordEncrypter;

  UserUtils(@Value("${mongodb.password}") String mongoDbPassword) throws Exception {

    String connectionData = "mongodb+srv://andrewsrajasekar:"
        + URLEncoder.encode(mongoDbPassword, StandardCharsets.UTF_8)
        + "@cookifycluster.xuvod7s.mongodb.net/?retryWrites=true&w=majority";
    ConnectionString connectionString = new ConnectionString(connectionData);
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(connectionString)
        .build();
    MongoClient mongoClient = MongoClients.create(settings);
    MongoDatabase database = mongoClient.getDatabase("cookifyApp");
    collection = database.getCollection("users");

    passwordEncrypter = new PasswordEncryptor();
  }

  public JSONArray getUsers() {
    JSONArray users = new JSONArray();
    FindIterable<Document> iterDoc = collection.find();
    Iterator<Document> it = iterDoc.iterator();
    while (it.hasNext()) {
      Document document = it.next();
      JSONObject data = new JSONObject(document.toJson());
      data.put("id", data.getJSONObject("_id").get("$oid").toString());
      data.remove("_id");
      data.put("password", passwordEncrypter.decrypt(data.getString("password")));
      users.put(data);
    }
    return users;
  }

  public JSONObject getUserById(String id){
    ObjectId objectId = new ObjectId(id);
    Document document = collection.find(eq("_id", objectId)).first();
    if (document == null) {
      return null;
    }else{
      JSONObject data = new JSONObject(document.toJson());
      data.put("id", data.getJSONObject("_id").get("$oid").toString());
      data.remove("_id");
      data.put("password", passwordEncrypter.decrypt(data.getString("password")));
      return data;
    }
  }

  public JSONArray getUserByConditions(String email, String username, String password){
    JSONArray users = new JSONArray();
    BasicDBObject criteria = new BasicDBObject();
    if(email != null && email.trim() != ""){
      criteria.append("email", email);
    }
    if(username != null && username.trim() != ""){
      criteria.append("username", username);
    }
    if(password != null && password.trim() != ""){
      criteria.append("password", passwordEncrypter.encrypt(password));
    }
    FindIterable<Document> iterDoc = collection.find(criteria);
    Iterator<Document> it = iterDoc.iterator();
    while (it.hasNext()) {
      Document document = it.next();
      JSONObject data = new JSONObject(document.toJson());
      data.put("id", data.getJSONObject("_id").get("$oid").toString());
      data.remove("_id");
      data.put("password", passwordEncrypter.decrypt(data.getString("password")));
      users.put(data);
    }
    return users;
  }


  public Boolean createUser(String email, String username, String password) throws Exception {
    if(collection.find(eq("email", email)).first() != null || collection.find(eq("username", username)).first() != null){
      return false;
    }
    Document document = new Document("email", email)
        .append("username", username)
        .append("password", passwordEncrypter.encrypt(password));
    collection.insertOne(document);
    return true;
  }

  public Boolean updateUser(String id, String email, String username, String password) {
    ObjectId objectId = new ObjectId(id);
    Document document = collection.find(eq("_id", objectId)).first();
    if (document == null) {
      return false;
    } else {
      if(email != null && email.trim() != ""){
        collection.updateOne(eq("_id", objectId), Updates.set("email", email));
      }
      if(username != null && username.trim() != ""){
        collection.updateOne(eq("_id", objectId), Updates.set("username", username));
      }
      if(password != null && password.trim() != ""){
        collection.updateOne(eq("_id", objectId), Updates.set("password", passwordEncrypter.encrypt(password)));
      }
      return true;
    }
  }

  public Boolean deleteUser(String id) throws Exception {
    ObjectId objectId = new ObjectId(id);
    Document document = collection.find(eq("_id", objectId)).first();
    if (document == null) {
      return false;
    } else {
      collection.deleteOne(eq("_id", objectId));
      return true;
    }
  }

}
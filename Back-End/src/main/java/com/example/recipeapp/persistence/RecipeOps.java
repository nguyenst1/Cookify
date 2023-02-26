package com.example.recipeapp.persistence;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.example.recipeapp.api.ApiHandler;
import com.example.recipeapp.api.ApiHandler.APIKEYTYPE;
import com.example.recipeapp.api.ApiHandler.PATH;

@Component
public class RecipeOps {
    private static final Logger LOG = Logger.getLogger(RecipeOps.class.getName());
    private ApiHandler apiHandler;

    public RecipeOps(ApiHandler apiHandler){
        this.apiHandler = apiHandler;
    }

    public JSONObject getRecipe(String searchQuery, Integer servings) throws Exception{
        if(isGivenQueryaValidRecipe(searchQuery)){
            JSONObject body = new JSONObject();
            body.put("model", "text-davinci-003");
            body.put("prompt", "Recipe for " + searchQuery + " for " + servings + " servings " + "with instructions and ingredients");
            body.put("max_tokens", 4000);
            apiHandler.setApiKeyType(APIKEYTYPE.CHATGPTAPIKEY).setPath(PATH.COMPLETIONS).setBody(body).setSocketTimeOut(300000);
            //String response = "{\"choices\":[{\"text\":\"\\n\\nIngredients:\\n\\n1. 2 lb chicken parts (breast, thigh, drumstick)\\n\\n2. 2 cups Basmati rice\\n\\n3. 1/4 cup vegetable oil\\n\\n4. 2 onions, finely chopped\\n\\n5. 4 cloves garlic, minced\\n\\n6. 1 tablespoon freshly grated ginger\\n\\n7. 2 tablespoons garam masala\\n\\n8. 1 teaspoon ground cumin\\n\\n9. 1 teaspoon ground cardamom\\n\\n10. 1 teaspoon chili powder\\n\\n11. 1 teaspoon turmeric\\n\\n12. 1 teaspoon ground coriander\\n\\n13. 2 cups canned tomatoes, chopped\\n\\n14.1 cup plain yogurt\\n\\n15. 2 cups chicken broth\\n\\n16. Salt and pepper to taste\\n\\n17. 1/2 cup raisins\\n\\n18. 1/2 cup cashews, chopped\\n\\n19. 1/2 cup fresh cilantro, chopped\\n\\nInstructions:\\n\\n1. Preheat oven to 350░F.\\n\\n2. In a large skillet, heat oil over medium-high heat.\\n\\n3. Add onions and garlic and sautΘ until tender, about 5 minutes.\\n\\n4. Add ginger, garam masala, cumin, cardamom, chili powder, turmeric, and coriander; sautΘ for 1 minute more.\\n\\n5. Add canned tomatoes and cook for another minute.\\n\\n6. Stir in yogurt and chicken broth.\\n\\n7. Add chicken pieces and season with salt and pepper.\\n\\n8. Bring to a boil.\\n\\n9. Reduce heat; cover and simmer for 10 minutes.\\n\\n10. Meanwhile, rinse and drain the basmati rice.\\n\\n11. Place rice in a large baking dish and pour the chicken-tomato mixture over it.\\n\\n12. Top with raisins, chopped cashew and cilantro.\\n\\n13. Bake, covered, in preheated oven for 30-40 minutes or until rice is tender.\\n\\n14. Serve hot. Enjoy!\",\"index\":0,\"logprobs\":null,\"finish_reason\":\"stop\"}]}";
            String response = apiHandler.POST();
            LOG.info("Response is -- " + response);
            JSONObject responseObj = manipulateRecipe(response);
            LOG.info("Manipulate Response is -- " + responseObj.toString());
            //getImage(responseObj.getJSONArray("instructions").getString(0));
            return responseObj;
        }else{
            return new JSONObject().put("error_code", "NOT_A_VALID_RECIPE");
        }

    }

    public JSONObject getImage(String searchQuery) throws Exception{
        String utf8SearchQuery = new String(searchQuery.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        utf8SearchQuery = utf8SearchQuery.replace("°", " degree ").replace("º", " degree ");
        utf8SearchQuery = utf8SearchQuery.replace("breasts", "chest");
        JSONObject body = new JSONObject();
        body.put("size", "512x512");
        body.put("prompt", utf8SearchQuery);
        body.put("n", 1);
        body.put("response_format", "url");
        apiHandler.setApiKeyType(APIKEYTYPE.CHATGPTAPIKEY).setPath(PATH.IMAGE_GENERATION).setBody(body).setSocketTimeOut(300000);
        String response = apiHandler.POST();
        LOG.info("Image Response is -- " + response);
        JSONArray data =  new JSONObject(response).getJSONArray("data");
        LOG.info("Image data is -- " + data);
        return new JSONObject().put("url", data.getJSONObject(0).getString("url"));
    }

    public Boolean isGivenQueryaValidRecipe(String searchQuery) throws Exception{
        JSONObject body = new JSONObject();
        body.put("model", "text-davinci-003");
        body.put("prompt", "is " + searchQuery + " a valid recipe, answer in a word");
        body.put("max_tokens", 4000);
        apiHandler.setApiKeyType(APIKEYTYPE.CHATGPTAPIKEY).setPath(PATH.COMPLETIONS).setBody(body).setSocketTimeOut(300000);
        //String response = "{\"choices\":[{\"text\":\"\\n\\nIngredients:\\n\\n1. 2 lb chicken parts (breast, thigh, drumstick)\\n\\n2. 2 cups Basmati rice\\n\\n3. 1/4 cup vegetable oil\\n\\n4. 2 onions, finely chopped\\n\\n5. 4 cloves garlic, minced\\n\\n6. 1 tablespoon freshly grated ginger\\n\\n7. 2 tablespoons garam masala\\n\\n8. 1 teaspoon ground cumin\\n\\n9. 1 teaspoon ground cardamom\\n\\n10. 1 teaspoon chili powder\\n\\n11. 1 teaspoon turmeric\\n\\n12. 1 teaspoon ground coriander\\n\\n13. 2 cups canned tomatoes, chopped\\n\\n14.1 cup plain yogurt\\n\\n15. 2 cups chicken broth\\n\\n16. Salt and pepper to taste\\n\\n17. 1/2 cup raisins\\n\\n18. 1/2 cup cashews, chopped\\n\\n19. 1/2 cup fresh cilantro, chopped\\n\\nInstructions:\\n\\n1. Preheat oven to 350░F.\\n\\n2. In a large skillet, heat oil over medium-high heat.\\n\\n3. Add onions and garlic and sautΘ until tender, about 5 minutes.\\n\\n4. Add ginger, garam masala, cumin, cardamom, chili powder, turmeric, and coriander; sautΘ for 1 minute more.\\n\\n5. Add canned tomatoes and cook for another minute.\\n\\n6. Stir in yogurt and chicken broth.\\n\\n7. Add chicken pieces and season with salt and pepper.\\n\\n8. Bring to a boil.\\n\\n9. Reduce heat; cover and simmer for 10 minutes.\\n\\n10. Meanwhile, rinse and drain the basmati rice.\\n\\n11. Place rice in a large baking dish and pour the chicken-tomato mixture over it.\\n\\n12. Top with raisins, chopped cashew and cilantro.\\n\\n13. Bake, covered, in preheated oven for 30-40 minutes or until rice is tender.\\n\\n14. Serve hot. Enjoy!\",\"index\":0,\"logprobs\":null,\"finish_reason\":\"stop\"}]}";
        String response = apiHandler.POST();
        LOG.info("confirmation ::: " + response);
        LOG.info("confirmation Boolean 1 ::: " + new JSONObject(response).getJSONArray("choices").getJSONObject(0).getString("text").trim());
        LOG.info("confirmation Boolean 2 ::: " + new JSONObject(response).getJSONArray("choices").getJSONObject(0).getString("text").trim().equalsIgnoreCase("yes"));
       
        LOG.info("confirmation Boolean 3 ::: " + Boolean.valueOf(new JSONObject(response).getJSONArray("choices").getJSONObject(0).getString("text").trim().equalsIgnoreCase("yes")));
        return Boolean.valueOf(new JSONObject(response).getJSONArray("choices").getJSONObject(0).getString("text").trim().toLowerCase().contains("yes"));
    }

    private JSONObject manipulateRecipe(String response){
        try{
            String originalResponse = new JSONObject(response).getJSONArray("choices").getJSONObject(0).getString("text");
            List<String> responseSplitted = Arrays.asList(originalResponse.split("\n"));
            //List<String> responseSplitted = Arrays.asList(originalResponse.split("\\n\\n"));
            List<String> ingredients = new ArrayList<>();
            List<String> instructions = new ArrayList<>();
            Boolean isInstructionFound = false;
            Iterator<String> responseIter = responseSplitted.iterator();
            while(responseIter.hasNext()){
                String responseData = responseIter.next();
                if(responseData.equals("\n") || responseData.trim().equals("")){
                    continue;
                }
                if(responseData.startsWith("Instructions")){
                    isInstructionFound = true;
                    continue;
                }
                if(responseData.startsWith("Ingredients")){
                    isInstructionFound = false;
                    continue;
                }
                if(isInstructionFound){
                    instructions.add(getStepValue(responseData).trim());
                }else{
                    ingredients.add(getStepValue(responseData).trim());
                }
            }
            return new JSONObject().put("ingredients", ingredients).put("instructions", instructions);
            
        }catch(Exception ex){
            LOG.info("Response is -- " + response);
            LOG.warning("Exception is -- " + ex);
        }
        return new JSONObject();
    }

    private String getStepValue(String response){
        String splitter = "";
        for(char character : response.toCharArray()){
            if(Pattern.compile("[0-9]*").matcher(String.valueOf(character)).matches()){
                continue;
            }else if(Pattern.compile("[A-Za-z]").matcher(String.valueOf(character)).matches()){
                return response;
            }else{
                splitter = String.valueOf(character);
                break;
            }
        }
        int indexOfSplitter = response.indexOf(splitter);
        return response.substring(indexOfSplitter + 1, response.length());
    }
}

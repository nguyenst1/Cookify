package com.example.recipeapp.api;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

@Component
public class ApiHandler {
    public enum APIKEYTYPE{
        CHATGPTAPIKEY
    }
    public enum PATH{
        IMAGE_GENERATION("/v1/images/generations"),
        COMPLETIONS("/v1/completions");

        private String path;
        private PATH(String path){
            this.path = path;
        }

    }

    public ApiHandler(@Value("${chatgpt.api.key}") String chatGptApiKey){
        this.chatGptApiKey = chatGptApiKey;
        this.domain = HTTPS + "api.openai.com";
        this.connectionTimeOut = 5000;
        this.socketTimeOut = 5000;
    }

    private JSONObject params;
    private JSONObject headers;
    private JSONObject body;
    private String domain;
    private String path;
    private Integer connectionTimeOut;
    private Integer socketTimeOut;
    private String chatGptApiKey;
    private APIKEYTYPE apiKeyType = APIKEYTYPE.CHATGPTAPIKEY;

    private static final String HTTPS = "https://";
    private static final String SLASH = "/";

    public JSONObject getParams() {
        return params;
    }
    public ApiHandler setParams(JSONObject params) {
        this.params = params;
        return this;
    }
    public JSONObject getHeaders() {
        return headers;
    }
    public ApiHandler setHeaders(JSONObject headers) {
        this.headers = headers;
        return this;
    }
    public JSONObject getBody() {
        return body;
    }
    public ApiHandler setBody(JSONObject body) {
        this.body = body;
        return this;
    }

    public String getPath() {
        return path;
    }
    public ApiHandler setPath(PATH pathValue) {
        this.path = pathValue.path;
        return this;
    }

    public ApiHandler setConnectionTimeOut(Integer connectionTimeOut) {
        this.connectionTimeOut = connectionTimeOut;
        return this;
    }
    public ApiHandler setSocketTimeOut(Integer socketTimeOut) {
        this.socketTimeOut = socketTimeOut;
        return this;
    }
    public ApiHandler setApiKeyType(APIKEYTYPE apiKeyType) {
        this.apiKeyType = apiKeyType;
        return this;
    }

    public String POST() throws Exception{
        checkRequestQuality();
        String result = "";
        HttpPost httpPost = new HttpPost(domain + path);

        //Headers Part
        if(!headers.isEmpty()){
            for(String key : headers.keySet()){
                httpPost.setHeader(key, headers.getString(key));
            }
        }

        //parameters part
        URIBuilder uriBuilder = new URIBuilder(httpPost.getURI());
        for(String key : params.keySet()){
            uriBuilder.addParameter(key, params.getString(key));
        }

        httpPost.setURI(uriBuilder.build());

        //Body Part
        httpPost.setEntity(new StringEntity(body.toString()));

        //Timeout Part
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(connectionTimeOut).setSocketTimeout(socketTimeOut).build();
        httpPost.setConfig(requestConfig);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httpPost)) {

            result = EntityUtils.toString(response.getEntity());
        }

        clear();
        return result;
    }

    public String GET() throws Exception{
        checkRequestQuality();
        String result = "";
        HttpGet httpGet = new HttpGet(domain + path);

        //Headers Part
        if(!headers.isEmpty()){
            for(String key : headers.keySet()){
                httpGet.setHeader(key, headers.getString(key));
            }
        }

        //parameters part
        URIBuilder uriBuilder = new URIBuilder(httpGet.getURI());
        for(String key : params.keySet()){
            uriBuilder.addParameter(key, params.getString(key));
        }
        
        //Timeout Part
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(connectionTimeOut).setSocketTimeout(socketTimeOut).build();
        httpGet.setConfig(requestConfig);

        httpGet.setURI(uriBuilder.build());

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httpGet)) {

            result = EntityUtils.toString(response.getEntity());
        }

        clear();
        return result;
    }

    public String PUT() throws Exception{
        checkRequestQuality();
        String result = "";
        HttpPut httpPut = new HttpPut(domain + path);

        //Headers Part
        if(!headers.isEmpty()){
            for(String key : headers.keySet()){
                httpPut.setHeader(key, headers.getString(key));
            }
        }

        //parameters part
        URIBuilder uriBuilder = new URIBuilder(httpPut.getURI());
        for(String key : params.keySet()){
            uriBuilder.addParameter(key, params.getString(key));
        }

        //Body Part
        httpPut.setEntity(new StringEntity(body.toString()));
        
        //Timeout Part
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(connectionTimeOut).setSocketTimeout(socketTimeOut).build();
        httpPut.setConfig(requestConfig);

        httpPut.setURI(uriBuilder.build());

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httpPut)) {

            result = EntityUtils.toString(response.getEntity());
        }

        clear();
        return result;
    }

    public String DELETE() throws Exception{
        checkRequestQuality();
        String result = "";
        HttpDelete httpDelete = new HttpDelete(domain + path);

        //Headers Part
        if(!headers.isEmpty()){
            for(String key : headers.keySet()){
                httpDelete.setHeader(key, headers.getString(key));
            }
        }

        //parameters part
        URIBuilder uriBuilder = new URIBuilder(httpDelete.getURI());
        for(String key : params.keySet()){
            uriBuilder.addParameter(key, params.getString(key));
        }

        //Timeout Part
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(connectionTimeOut).setSocketTimeout(socketTimeOut).build();
        httpDelete.setConfig(requestConfig);

        httpDelete.setURI(uriBuilder.build());

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httpDelete)) {

            result = EntityUtils.toString(response.getEntity());
        }

        clear();
        return result;
    }
    
    private void checkRequestQuality() throws Exception{
        if(params == null){
            params = new JSONObject();
        }
        if(headers == null){
            headers = new JSONObject();
        }
        if(body == null){
            body = new JSONObject();
        }
        if(path == null){
            path = "";
        }

        if(!headers.has("Content-Type")){
            headers.put("Content-Type", "application/json");
        }
        if(!headers.has("Authorization")){
            headers.put("Authorization", "Bearer " + (apiKeyType == APIKEYTYPE.CHATGPTAPIKEY ? chatGptApiKey : chatGptApiKey));
        }
    }

    private void clear(){
        params = null;
        headers = null;
        body = null;
        path = null;
        apiKeyType = null;
        socketTimeOut = 5000;
        connectionTimeOut = 5000;
    }
}

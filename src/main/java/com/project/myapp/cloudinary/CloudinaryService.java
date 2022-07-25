package com.project.myapp.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.myapp.encriptar.Encriptar;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

public class CloudinaryService {

    Encriptar encriptar = new Encriptar();

    private String cloudName = "moonsoft";

    private String apiKey = "651693723455627";

    private String apiSecret = "lMVRsÑpXHxYEjy3m1NJfIxFBVnk";

    public String uploadFile(String image) {
        try {
            Cloudinary cloudinary;
            Map config = new HashMap();
            config.put("cloud_name", cloudName);
            config.put("api_key", apiKey);
            config.put("api_secret", encriptar.desencripta(apiSecret));
            cloudinary = new Cloudinary(config);
            File uploadedFile = (new File(image));
            Map uploadResult = cloudinary.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

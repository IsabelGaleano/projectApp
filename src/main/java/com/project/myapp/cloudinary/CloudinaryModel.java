package com.project.myapp.cloudinary;

public class CloudinaryModel {

    private String image;

    public CloudinaryModel() {}

    public CloudinaryModel(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

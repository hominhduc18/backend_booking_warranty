const jwt = require('jsonwebtoken')
const express = require('express');
const multer = require('multer');
const path = require('path');

const middlewareController = {
    // xác nhận token phải ng đó ko
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const  accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY,(err,user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401),json("You're not authenticated");
        }
    },
    // chỉ có mình hoặc adminh mới đc xóa tài khoản 
    verifydelete: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else {
                return res.status(403),json("You're not allowed to delete other");
            }
        })
    },
    /// Khởi tạo multer để lưu trữ ảnh upload lên server
    
}

 module.exports = middlewareController;
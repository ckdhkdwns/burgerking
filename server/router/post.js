const express = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");

const { createUUID } = require("../uuid/createUUID");
const { sequelize } = require("../models");
const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
        order: [["createdAt", "DESC"]]
    });
    return res.send(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });
    return res.send(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    if (!ip) return error;
    if(!req.body.title || !req.body.content) return error;
    const writePost = await Post.create({
      id: createUUID(),
      title: req.body.title,
      content: req.body.content,
      writer_ip: ip,
    });
    return res.send(writePost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      order: [["createdAt", "DESC"]],
      where: { 
        deletedAt: null,
        post_id: req.params.id
       },
    });
    res.send(comments);
  } catch (err) {
    console.err(err);
    next(err);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  if (!ip || !req.params.id || !req.body.content) throw new Error("No Content");
  try {
    const createComment = await Comment.create({
      id: createUUID(),
      content: req.body.content,
      writer_ip: ip,
      post_id: req.params.id,
    });
    res.send(createComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  
    try {
      const d = await Post.destroy({
        where: {
          id: req.params.id,
          writer_ip: ip
        },
      });
      if(!d) throw new Error("No post to delete")
      await Comment.destroy({
          where: {
            post_id: req.params.id
          }
      })
      return res.send(true);
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.delete("/:id/comments", async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    try {
      await Comment.destroy({
        where: {
          id: req.body.id,
          writer_ip: ip
        },
      });
      
      return res.send(true);
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;

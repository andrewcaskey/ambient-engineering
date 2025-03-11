import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');

  // Get all stories
  app.get('/api/stories', async (req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stories' });
    }
  });

  // Get featured stories
  app.get('/api/stories/featured', async (req, res) => {
    try {
      const stories = await storage.getFeaturedStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured stories' });
    }
  });

  // Get a story by ID
  app.get('/api/stories/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const story = await storage.getStory(id);
      
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }
      
      res.json(story);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching story' });
    }
  });

  // Get all videos
  app.get('/api/videos', async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching videos' });
    }
  });

  // Get featured videos
  app.get('/api/videos/featured', async (req, res) => {
    try {
      const videos = await storage.getFeaturedVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured videos' });
    }
  });

  // Get all articles
  app.get('/api/articles', async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching articles' });
    }
  });

  // Get all gallery items
  app.get('/api/gallery', async (req, res) => {
    try {
      const gallery = await storage.getAllGalleryItems();
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching gallery items' });
    }
  });

  // Subscribe to newsletter
  app.post('/api/subscribe', async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(subscriberData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: 'Error subscribing to newsletter' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

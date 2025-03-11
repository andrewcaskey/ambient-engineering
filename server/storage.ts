import { readFile } from "fs/promises";
import { join } from "path";
import { 
  User, InsertUser, users,
  Story, InsertStory, stories, 
  Video, InsertVideo, videos, 
  Article, InsertArticle, articles, 
  GalleryItem, InsertGalleryItem, gallery,
  Subscriber, InsertSubscriber, subscribers
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Story methods
  getAllStories(): Promise<Story[]>;
  getFeaturedStories(): Promise<Story[]>;
  getStory(id: number): Promise<Story | undefined>;
  
  // Video methods
  getAllVideos(): Promise<Video[]>;
  getFeaturedVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  
  // Article methods
  getAllArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  
  // Gallery methods
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  
  // Subscriber methods
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private videos: Map<number, Video>;
  private articles: Map<number, Article>;
  private gallery: Map<number, GalleryItem>;
  private subscribers: Map<number, Subscriber>;
  
  // Current IDs for auto-increment
  private currentUserId: number;
  private currentStoryId: number;
  private currentVideoId: number;
  private currentArticleId: number;
  private currentGalleryId: number;
  private currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.videos = new Map();
    this.articles = new Map();
    this.gallery = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentStoryId = 1;
    this.currentVideoId = 1;
    this.currentArticleId = 1;
    this.currentGalleryId = 1;
    this.currentSubscriberId = 1;
    
    // Initialize with data
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      // Load stories
      const storiesData = await this.loadJsonFile<Story[]>('stories.json');
      storiesData.forEach(story => {
        this.stories.set(story.id, story);
        this.currentStoryId = Math.max(this.currentStoryId, story.id + 1);
      });

      // Load videos
      const videosData = await this.loadJsonFile<Video[]>('videos.json');
      videosData.forEach(video => {
        this.videos.set(video.id, video);
        this.currentVideoId = Math.max(this.currentVideoId, video.id + 1);
      });

      // Load articles
      const articlesData = await this.loadJsonFile<Article[]>('articles.json');
      articlesData.forEach(article => {
        this.articles.set(article.id, article);
        this.currentArticleId = Math.max(this.currentArticleId, article.id + 1);
      });

      // Load gallery items
      const galleryData = await this.loadJsonFile<GalleryItem[]>('gallery.json');
      galleryData.forEach(item => {
        this.gallery.set(item.id, item);
        this.currentGalleryId = Math.max(this.currentGalleryId, item.id + 1);
      });
      
      console.log('Initial data loaded successfully');
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  private async loadJsonFile<T>(filename: string): Promise<T> {
    try {
      const filePath = join(process.cwd(), 'server/data', filename);
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return [] as unknown as T;
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Story methods
  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getFeaturedStories(): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }
  
  // Video methods
  async getAllVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getFeaturedVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }
  
  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  // Gallery methods
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.gallery.values());
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.gallery.get(id);
  }
  
  // Subscriber methods
  async addSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const now = new Date();
    const subscriber: Subscriber = { ...insertSubscriber, id, subscribedAt: now };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();

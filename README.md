# Cognizant AI Chat App Assessment

## Video Demo

Check out the live demo of this project here: [View Video Demo](https://youtu.be/njkWXW7odxs)

## **Getting Started**

You can run the project **either using Docker** or **locally**.

---

## Hugging Face API Setup

To use the Hugging Face API, you need to generate an access token and store it in your project.

### Steps

1. Go to [Hugging Face](https://huggingface.co/) and **login** or **register** for an account.
2. Click on your **profile** in the top right corner and select **Access Tokens**.
3. Click **Create New Token**.
4. Give your token a **name**.
5. Set the **role/permissions** to `Write`.
6. Click **Create Token**.
7. **Copy** the generated token.
8. In your project root directory, create a file named `.env`.
9. Add the following line to your `.env` file:

   ```env
   VITE_HF_API_TOKEN=YOUR-ACCESS-TOKEN
   ```

10. Replace `YOUR-ACCESS-TOKEN` with the token you copied.

### **Option 1: Docker**

1. Make sure **Docker** and **Docker Compose** are installed.
2. Build and start the container:

```bash
docker-compose up --build
```

3.  Open your browser at:

```bash
http://localhost:3000
```

### **Option 2: Local**

1.  Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3.  Open your browser at:

```bash
http://localhost:3000
```

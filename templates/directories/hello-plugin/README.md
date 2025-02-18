# Hello Plugin

This is a sample plugin for Synapse. It adds the `hello` command.

## How to Use

Run the command:
```bash
pnpm synapse hello-plugin hello
```
### **4. Testing the Updated Plugin**

1. **Add the Plugin**:
   - Place the `hello-plugin` folder inside the `plugins` folder.
2. **Run the Plugin Command**:
   ```bash
   pnpm synapse hello-plugin hello
   ```
Expected output:
```
Plugin loaded: hello-plugin (1.0.0)
Hello world! This is a Synapse plugin.
```
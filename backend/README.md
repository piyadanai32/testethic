# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

 Applying changes to the database
 ```bash
bunx drizzle-kit push
```
Alternatively, you can generate migrations using the `drizzle-kit generate` command and then apply them using the `drizzle-kit migrate` command:

Generate migrations:
```bash
bunx drizzle-kit generate
```

Apply migrations:
```bash
bunx drizzle-kit migrate
```


This project was created using `bun init` in bun v1.1.38. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

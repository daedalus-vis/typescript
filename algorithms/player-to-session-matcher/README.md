# Player to Session Matcher

A TypeScript simulation of a multiplayer game matchmaking system. Players are matched into game sessions based on rank-derived difficulty levels, mimicking how a lobby-based matchmaker would pair compatible players together.

## Purpose

Demonstrates a simple matchmaking algorithm that:

- Creates a game session hosted by a player
- Derives a difficulty level (1–5) from the host's rank
- Polls a random player pool and matches only players whose rank maps to the same difficulty
- Transitions the game state from `lobby` → `ready` → `started` once enough players have joined

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

## Installation

```sh
npm install
```

## Running

```sh
npx tsx player-to-session-matcher.ts
```

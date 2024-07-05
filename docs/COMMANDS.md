# Slash Commands List

## music Commands

### `/volume`

Adjust the volume of the music.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| level | The volume level to set (0-100). | false | Number | |

---

### `/swap`

Swap the position of two songs in the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| first | The position of the first song | true | Number | |
| second | The position of the second song | true | Number | |

---

### `/stop`

Stop the music

---

### `/songs previous`

Display the previous songs.

---

### `/songs next`

Display the next songs.

---

### `/skipto`

Skip to a specific song
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The song position (The next one is 1, 2,... The previous one is -1, -2,...) | true | Number | |

---

### `/skip`

Skip to the next song

---

### `/shuffle`

Shuffle the songs in the queue

---

### `/seek`

Seek the song to a another timestamp.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| timestamp | The timestamp to seek to (mm:ss). | true | String | |

---

### `/resume`

Resume the music

---

### `/replay`

Replay the current song from the beginning

---

### `/repeat status`

Show the current repeat mode.

---

### `/repeat off`

Disable repeat mode.

---

### `/repeat queue`

Repeat the entire queue.

---

### `/repeat song`

Repeat the current song.

---

### `/remove`

Remove a song from the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The position of the song to remove | true | Number | |

---

### `/play`

Play music from a URL or search query.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| input | The music URL or search query | true | String | |
| now | Skip the current and play now | false | Boolean | |
| position | Position in the queue | false | Number | |

---

### `/pause`

Pause the music

---

### `/np`

Show the currently playing song

---

### `/move`

Move the position of a song in the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| from | The current position of the song | true | Number | |
| to | The new position to move to | true | Number | |

---

### `/lyrics`

Get lyrics for a song.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| query | The name of the song. | false | String | |

---

### `/leave`

Leave the voice channel.

---

### `/filter toggle`

Toggle an audio filter
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| filter | Select the filter | true | String | 3d, bassboost, echo, flanger, gate, haas, karaoke, nightcore, reverse, vaporwave, mcompand, phaser, tremolo, surround, earwax |

---

### `/filter clear`

Clear all enabled audio filters

---

### `/filter status`

Show the status of all filters

---

### `/clear next`

Clear the next songs.

---

### `/clear previous`

Clear the previous songs.

---

### `/clear all`

Clear all the songs.

---

### `/back`

Back to the previous song

---

### `/autoplay`

Toggle autoplay mode

---

## misc Commands

### `/uptime`

See how long I have been up

---

### `/ping`

Ping? Pong!

---

### `/invite`

Invite me to your server

---

### `/info`

See some info about me

---

### `/help`

Join the support server and get some help

---

## dev Commands

### `/eval`

Execute a piece of javascript code
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| code | The code to execute | true | String | |

---

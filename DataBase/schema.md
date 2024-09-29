### Tutor:

| Field              | Type       | Description                                      |
| ------------------ | ---------- | ------------------------------------------------ |
| id                 | int        | Unique identifier for the tutor                  |
| name               | string     | Name of the tutor                                |
| email              | string     | Email of the tutor                               |
| phone              | string     | Phone number of the tutor                        |
| gender             | string     | Gender of the tutor                              |
| picture            | string     | Picture of the tutor                             |
| course_id          | int\[\]    | Array of course IDs the tutor is associated with |
| schedule_available | string\[\] | Array of days the tutor is available             |
| schedule_taken     | string\[\] | Array of days the tutor has classes              |
| role               | string     | Role of the tutor (e.g., tutor)                  |
| password           | string     | Password for the tutor's account                 |

### Student:

| Field      | Type     | Description                             |
| ---------- | -------- | --------------------------------------- |
| id         | int      | Unique identifier for the student       |
| name       | string   | Name of the student                     |
| email      | string   | Email of the student                    |
| phone      | string   | Phone number of the student             |
| gender     | string   | Gender of the student                   |
| pictures   | string   | Picture of the student                  |
| courses    | int\[\]  | Array of course IDs the student is enrolled in |
| schedule   | string\[\] | Array of days the student has classes  |
| password   | string   | Password for the student's account      |
| role       | string   | Role of the student (e.g., student)     |

### Course:

| Field       | Type     | Description                                                        |
| ----------- | -------- | ------------------------------------------------------------------ |
| id          | int      | Unique identifier for the course                                   |
| name        | string   | Name of the course                                                 |
| tutors_id   | int\[\]  | Array of tutor IDs who teach the course                            |
| image_url   | string   | URL of the image representing the course                           |
| description | string   | Description of the course                                          |
| subject     | string   | Subject category of the course (e.g., Health, Mathematics, etc.)   |

To add data just run

```terminal
npm run dev
```

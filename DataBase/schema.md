### Tutor:

| Field      | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| id         | int      | Unique identifier for the tutor     |
| name       | string   | Name of the tutor                   |
| email      | string   | Email of the tutor                  |
| phone      | string   | Phone number of the tutor           |
| gender     | string   | gender of the tutor                 |
| pictures   | string   | Picture of the tutor                |
| created_at | datetime | Date and time of the tutor creation |
| subjects   | string   | Subjects that the tutor teaches     |
| schedule   | string   | Schedule of the tutor               |

### Student:

| Field      | Type     | Description                             |
| ---------- | -------- | --------------------------------------- |
| id         | int      | Unique identifier for the student       |
| name       | string   | Name of the student                     |
| email      | string   | Email of the student                    |
| phone      | string   | Phone number of the student             |
| gender     | string   | gender of the student                   |
| pictures   | string   | Picture of the student                  |
| created_at | datetime | Date and time of the student creation   |
| subjects   | string   | Subjects that the student is studying   |
| stregth    | string   | Strength of the student in the subjects |
| weakness   | string   | Weakness of the student in the subjects |

### Course:
| Field      | Type     | Description                             |
| ---------- | -------- | --------------------------------------- |
| id         | int      | Unique identifier for the course       |
| name       | string   | Name of the course                     |
| tutors_id  | int      | Tutor id who teaches the course        |

To add data just run

```terminal
npm run add_dummy
```

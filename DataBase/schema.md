### Teacher:

| Field | Type | Description                       |
| --- | --- |-----------------------------------|
| id | int | Unique identifier for the teacher |
| name | string | Name of the teacher               |
| email | string | Email of the teacher              |
| phone | string | Phone number of the teacher       |
| gender | string | gender of the teacher             |
| pictures | string | Picture of the teacher           |
| created_at | datetime | Date and time of the teacher creation |
| subjects | string | Subjects that the teacher teaches |
| schedule | string | Schedule of the teacher           |

### Student:
| Field | Type | Description                             |
| --- | --- |-----------------------------------------|
| id | int | Unique identifier for the student       |
| name | string | Name of the student                     |
| email | string | Email of the student                    |
| phone | string | Phone number of the student             |
| gender | string | gender of the student                   |
| pictures | string | Picture of the student                  |
| created_at | datetime | Date and time of the student creation   |
| subjects | string | Subjects that the student is studying   |
| stregth | string | Strength of the student in the subjects |
| weakness | string | Weakness of the student in the subjects |

###
To add data just run 
```terminal
npm run add_dummy
```

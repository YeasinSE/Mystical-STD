![Logo]()

# MYSTICAL STD
MysticalSTD is a simple app built to demonstrate the Microservice Architecture Pattern using NodeJs, Express, kafka, redis and aws cloud etc. This app provides the developer experience and infrastructure to scan, test and deploy personalized Front-End Webapp. The project is intended as a tutorial but you are welcome to contributions.

The project is still in testing progress. Hopefully, many new features will be added in the future. [Lets check whats new will come](https://github.com/YeasinSE/Mystical-STD/issues)

## Architecture
![Mystical_Architect](https://github.com/YeasinSE/Mystical-STD/assets/67215692/00cb360d-9e5e-461b-96d5-c798f5e1fee1)

`Note: I have skipped some features of the above architecture in this version. For example:`

1. Api gateway
2. Trace and Monitoring API
3. ETL Pipeline etc

`Hopefully, from the next version, I will try to implement one by one.`

`I intend to add some more new features in the future. such as`

1. DigitalOcean deployment infrastructure
2. Setup devOps etc

## Services:

`Please click for details information about each service.`
-------------------------------------------------------------------------------------
- [Api-Server](https://github.com/YeasinSE/Mystical-STD/edit/main/api-server/README.md)
- [Api-Log-Server](https://github.com/YeasinSE/Mystical-STD/blob/main/api-log-server/README.md)
- [Deployer-Consumer](https://github.com/YeasinSE/Mystical-STD/blob/main/deployer-consumer/README.md)
- [Deployer-Mystical-Infrastructure](https://github.com/YeasinSE/Mystical-STD/blob/main/deployer-mystical-infrastructure/README.md)
- [Log-Consumer](https://github.com/YeasinSE/Mystical-STD/blob/main/log-consumer/README.md)
- [Notification-Consumer](https://github.com/YeasinSE/Mystical-STD/blob/main/notification-consumer/README.md)
- [Scanner-Consumer](https://github.com/YeasinSE/Mystical-STD/blob/main/scanner-consumer/README.md)
- [Scanner-Mystical-Infrastructure](https://github.com/YeasinSE/Mystical-STD/blob/main/scanner-mystical-infrastructure-node/README.md)
- [Scanner-Sonar-Infrastructure](https://github.com/YeasinSE/Mystical-STD/blob/main/scanner-sonar-infrastructure-node/README.md)
- [Scanner-Bearer-Infrastructure](https://github.com/YeasinSE/Mystical-STD/blob/main/scanner-bearer-infrastructure-node/README.md)
- [System-Log-Consumer](https://github.com/YeasinSE/Mystical-STD/blob/main/system-log-consumer/README.md)
- [Mystical-App](https://github.com/YeasinSE/Mystical-STD/blob/main/mystical-app/README.md)
- [Proxy-Server](https://github.com/YeasinSE/Mystical-STD/blob/main/proxy-server/README.md)

## How To Start Mystical application
If all above service configure and run successfully now you can go throw below step for Execute the api in postman.

#### Step 1 : Create project 
 
```http
  POST http://localhost:5000/api/v1/project/create
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projectUrl` | `string` | **Required**. Your github project url |
| `projectKey` | `string` | **Required**. Your project unique key |
| `projectType` | `string` | **Required**. Your project type like react |
| `domain` | `string` | **Optional** Your project custom |

`Note:` Get project uuid thats required when scan and deploy your project

#### Step 2 : Create an Organization
```http
  POST http://localhost:5000/api/v1/organization/create
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `provider` | `string` | **Required**. Your org provider like sonarcloud |
| `name` | `string` | **Required**. Your org provider like sonar |
| `hostUrl` | `string` | **Required**. Your project type like https://sonarcloud.io |

`Note:` Get organization uuid thats require when create organization project, scan and deploy your project

#### Step 3: Create project in Organization
```http
  POST http://localhost:5000/api/v1/organization/project/create
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `organizationUUID` | `string` | **Required**. Your organization uuid |
| `projectKey` | `string` | **Required**. Your organization projectKey |
| `accessToken` | `string` | **Required**.Your organization project access token|

`Note:` Get organization project uuid thats required when scan and deploy your project`

`if you are want send report to sonarcloud its should be valid sonatcloud 'projectKey' and 'access token'`


#### Step 4: (Scan Project Request):
```http
  POST http://localhost:5000/api/v1/project/scan
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projectUUID` | `string` | **Required**. Your project uuid |
| `organizationID` | `string` | **Required**. Your organization uuid |
| `organizationProjectID` | `string` | **Required**.Your organization project uuid |

`Note:` Get scan processUUID

#### Step 5: (Send Scan Logs Details Request):
```http
  GET http://localhost:5009/logs/projectUUID/process/processUUID/sync?stage=scan&version=10
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projectUUID` | `string` | **Required**. Your project uuid |
| `processUUID` | `string` | **Required**. Your scan request process uuid |


#### Step 6: (Deploy Project Request):
```http
  POST http://localhost:5000/api/v1/project/deploy
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projectUUID` | `string` | **Required**. Your project uuid |
| `organizationID` | `string` | **Required**. Your organization uuid |
| `organizationProjectID` | `string` | **Required**.Your organization project uuid |

`Note:` Get scan processUUID

#### Step 7: (Send Deploy Logs Details Request):
```http
  GET http://localhost:5009/logs/projectUUID/process/processUUID/sync?stage=deploy&version=10
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projectUUID` | `string` | **Required**. Your project uuid |
| `processUUID` | `string` | **Required**. Your deploy request process uuid |

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://red-star-627304.postman.co/collection/1407069-6b108f48-44cf-4218-8a2c-edc31cbeb0ad?source=rip_markdown)


## Contributions are welcome!
MysticalSTD is open source, and would greatly appreciate your help. Feel free to suggest and implement any improvements. 

#### See Contributions Guidline:
[open source contribution guideline](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

#### Lets Contributions:
[Lets Comntributions](https://github.com/YeasinSE/Mystical-STD/issues)

## License

[MIT](https://choosealicense.com/licenses/mit/)

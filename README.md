# Code Challenge: Breweries ETL + API

AutoCloud Coding Challenge

# Requirements

Coding challenge requirements:

Tech Stack to use: `Node + Express + TypeScript + Passport + Jest`

Data source: https://api.openbrewerydb.org/breweries

Challenge requirements: Using the above tech stack, write a REST API with a single /breweries endpoint that returns a list of breweries in the United States. The /breweries endpoint of your API should be tested with Jest and secured using Passport. In addition to fetching this data directly from the data source above, this endpoint should function as an ETL data pipeline where you process the data in the following ways:

- Step 1) Remove any attributes that are null from the data
- Step 2) Convert the keys of the objects in the response from snake case to camel case (e.g. “postal_code” -> “postalCode”)
- Step 3) Group the breweries together by state and then sort them by created_at so the most recent ones come first.
- Step 4) Add an attribute to each brewery called region that adds the correct region to each brewery based on this map: https://www.worldatlas.com/articles/the-regions-of-the-united-states.html (hint - take a look at the GPS coordinates for the United States and then use the longitude & latitude attributes for each brewery to compute this). If the brewery does not have a longitude & latitude then filter it out.

Note that each step above should be considered a separate step in the ETL pipeline and must run independently. This system should be modular and allow for future developers to easily add additional steps for processing. Please test to make sure that the data is fetchable via your /breweries endpoint and include instructions for how to do this in a README.md as part of the documentation.

Please don’t use lodash/underscore/rambda or any other helper libraries - we want to see your vanilla TypeScript abilities.

Bonus: Give thought to how you can make this system both modular and extendable in order to allow future developers to add steps to the ETL pipeline so the data can be processed in different ways.

# Design Decisions and Architecture

The solution to this code challenge involves

- A layered architecture
  | Folder | Description |
  |--------------|-----------------------------------------------------------------------------------|
  | `src/app` | Presentation layer: It defines the routes and controllers to handle the requests |
  | `src/business` | Business layer: Logic for data manipulation |
  | `src/inf` | Infrastructure: Tooling and structures to get the app running |
  | `src/utils` | Utils: Reusable Code |

- A pipeline (Chain of Responsibility)

  In order to process the data from the _breweries endpoint_, each step is considered as an _Operation_ and a _Pipeline_ is an Operation itself that can register and execute multiple Operations

  | Operation File                      | Description                                                              |
  | ----------------------------------- | ------------------------------------------------------------------------ |
  | `RemoveNullableAttributesOperation` | Removes the null fields                                                  |
  | `SnakeToCamelCaseOperation`         | Converts the fields from snake_case to camelCase                         |
  | `GroupAndSortOperation`             | Groups the breweries by state and order them by descending creation date |
  | `MapToRegionOperation`              | Adds the region to each brewery based on latitude and longitude          |

  These operations are part of the `BreweryPipeline` which is built by the `BreweryPipelineBuilder`.

  ```
  Any modification to the 'Breweries ETL Pipeline' has to be done by altering the builder, either to add or remove steps of the chain
  ```

  Additionally, the `BreweryPipelineBuilder` allow us to create a `BreweryPipelineWithLogging` containing an optional `LoggerWrapperOperation` that logs data before and after each operation execution

- To make the code maintainable, this solution is intended to follow the best pratices, such as design patterns, loose coupling of services or OOP principles. However some parts of the code can be improved, such as

  - Adding _Strong Types_ to each of the operations inputs and outputs (instead of `any`)
    - It'd help to catch errors in compilation (transpilation) time (even though we'd lose flexibility when manipulating the data, it'd help to catch errors at early stages)
  - Improve the _Dependency Injection_ mechanism (currently dependencies are created in the `DependencyResolver` file)

- The API Endpoint was secured using `Passport.js` using the _Basic Stretegy_ (username & password). So, if deployed, make sure to run it over _HTTPS_

  - user & password can be found in the `.env` file

- As per requirement, the usage of libraries was not allowed, which would have made some parts of the code easier to follow or easier to extend. For example, the current `HttpClient` using the native `http` module to get the request to the _Breweries endpoint_, in contrast to a library such as _Axios_

<br>

# Development

## Prerequisits

- `node.js`
- `npm`

## Steps

To get it running

- `npm install`
- `npm start`

For development

- `npm run watch`
  - runs the `tsc` command and _watch_ for changes
- `npm run dev`
  - uses _nodemon_ to reload the server on changes
- `npm run lint`
  - looks for _lint_ issues
- `npm test`

  - runs the whole suite of tests
  - in case you want to execute a given suite, a test file can be targeted running the command:

    | Command                                                                                             |
    | --------------------------------------------------------------------------------------------------- |
    | `npm test test/unit/app/controllers/api/BreweriesController.test.ts`                                |
    | `npm test test/unit/business/services/brewery/operations/RemoveNullableAttributesOperation.test.ts` |
    | `npm test test/unit/business/services/brewery/operations/SnakeToCamelCaseOperation.test.ts`         |
    | `npm test test/unit/business/services/brewery/operations/GroupAndSortOperation.test.ts`             |
    | `npm test test/unit/business/services/brewery/operations/MapToRegionOperation.test.ts`              |
    | `npm test test/unit/business/services/brewery/BreweryService.test.ts`                               |
    | `npm test test/integration/BreweryService.test.ts`                                                  |

- `npm run coverage`
  - gets the unit test code coverage

<br>

# Test the /Breweries Endpoint

There's a file `test.http` with the curl command to call the `breweries` api endpoint (if using the _REST Client_ in _VS Code_, you can run it from there). Otherwise, you can run the command from the shell

- (Username & password can be changed in the `.env` file)

```
curl -u guest@autocloud.dev:aut0cl0ud  -X GET -H 'Content-Type: application/json' http://localhost:3000/breweries
```

<br>

# Configurations

In order to configure the application, the settings can be found in the .env file
| Env Var | Default Value | Description |
|----------------------|-----------------------------------------|--------------------------------------------------------------------------------------|
| `PORT` | 3000 | Express port |
| `CORS_ENABLED` | true | To enable/disable CORS |
| `API_PREFIX` | '' (empty) | To add an API Prefix, usually 'api' |
| `MOCK_BREWERY_CALL` | false | To get the results from the local file instead of hitting the breweries api endpoint |
| `USE_LOGGING_PIPELINE` | false | To get logs before and after an Operation is run |
| `USER_USERNAME` | guest@autocloud.dev | Username used by Passport.js as part of the Basic Strategy |
| `PBREWERIES_ENDPOINT` | https://api.openbrewerydb.org/breweries | API Endpoint to get the breweries list |

<br>

# Log file

A log file `dist/.log/<date>` is created to track the execution of the application. It'll keep useful information about _ERRORS_ or the _State of the Pipeline Processing_, as well as a detail of how the Pipeline is configured

```
Building Brewery Pipeline:
  Pipeline: Brewery Pipeline
    |->Operation: RemoveNullableAttributesOperation
    |->Operation: SnakeToCamelCaseOperation
    |->Operation: GroupAndSortOperation
    |->Operation: MapToRegionOperation
```

dist/.log/date

## ETL Output

Sample response after calling the `/breweries` endpoint

<details open>
<p>

```json
[
  {
    "state": "Colorado",
    "breweries": [
      {
        "id": 9180,
        "obdbId": "boulder-beer-co-boulder",
        "name": "Boulder Beer Co",
        "breweryType": "regional",
        "street": "2880 Wilderness Pl",
        "city": "Boulder",
        "state": "Colorado",
        "postalCode": "80301-5401",
        "country": "United States",
        "longitude": "-105.2480158",
        "latitude": "40.026439",
        "updatedAt": "2018-08-24T00:00:00.000Z",
        "createdAt": "2018-07-24T00:00:00.000Z",
        "region": "West"
      }
    ]
  },
  {
    "state": "Pennsylvania",
    "breweries": [
      {
        "id": 11039,
        "obdbId": "goose-island-philadelphia-philadelphia",
        "name": "Goose Island Philadelphia",
        "breweryType": "brewpub",
        "street": "1002 Canal St",
        "city": "Philadelphia",
        "state": "Pennsylvania",
        "postalCode": "19123",
        "country": "United States",
        "longitude": "-75.13506341",
        "latitude": "39.9648491",
        "updatedAt": "2018-08-24T00:00:00.000Z",
        "createdAt": "2018-07-24T00:00:00.000Z",
        "region": "Northeast"
      }
    ]
  },
  {
    "state": "Michigan",
    "breweries": [
      {
        "id": 11767,
        "obdbId": "ironbark-brewery-jackson",
        "name": "Ironbark Brewery",
        "breweryType": "micro",
        "street": "2610 Kibby Rd",
        "city": "Jackson",
        "state": "Michigan",
        "postalCode": "49203-4908",
        "country": "United States",
        "longitude": "-84.43762976",
        "latitude": "42.2188971",
        "phone": "5177487988",
        "updatedAt": "2018-08-24T00:00:00.000Z",
        "createdAt": "2018-07-24T00:00:00.000Z",
        "region": "Midwest"
      }
    ]
  }
]
```

</p>
</details>

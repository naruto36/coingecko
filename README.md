# coingecko

I. Business Requirements
	Create an API with two microservices:

		Microservice 1: Email Cryptocurrency Current Price
			User Story: I, as an investor, would like to query the current price of a specific cryptocurrency and receive a graceful email about the result.
		Microservice 2: Search History
			User Story: I, as an investor, would like to retrieve all the search history (when and what cryptocurrency) from Microservice 1.

II. Technical Specifications
1. Microservices must be deployed 100% serverless on AWS.
2. All code implementation must be using NodeJS.
3. All code must be version controlled using git and GitHub.
4. CICD using any tool (preferably GitHub Actions).
5. Infrastructure as Code using any tool (preferably AWS SAM).
6. The architectural design of the API is open to the candidate.

III. Resources:
1. Cryptocurrency data API: https://www.coingecko.com/en/api/documentation
2. DynamoDB or RDS can be considered for data persistence.
3. SES can be considered for sending emails.

IV. Submission:
1. GitHub public repository link
2. API endpoint URL and documentation for usage
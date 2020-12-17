import boto3, json, os

ddbtable = os.environ['STORAGE_SURVEYS_ARN']

def handler(event, context):

	print(event)

	return {
		'statusCode': 200,
		'body': json.dumps(event['body'])
	}

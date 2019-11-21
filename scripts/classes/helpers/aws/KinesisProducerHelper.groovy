package helpers.aws


import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain
import com.amazonaws.services.kinesis.producer.Attempt
import com.amazonaws.services.kinesis.producer.KinesisProducerConfiguration
import com.amazonaws.services.kinesis.producer.KinesisProducer
import com.amazonaws.services.kinesis.producer.UserRecordFailedException
import com.amazonaws.services.kinesis.producer.UserRecordResult

import com.google.common.util.concurrent.FutureCallback
import com.google.common.util.concurrent.Futures
import com.google.common.util.concurrent.ListenableFuture
import sun.util.locale.StringTokenIterator

import java.nio.ByteBuffer
import java.nio.charset.CharsetEncoder
import java.nio.charset.Charset
import java.nio.CharBuffer


import groovy.json.JsonOutput


public class KinesisProducerHelper {

    private KinesisProducer producer

    private static final int RECORDS_PER_SECOND = 2000;
    public static final String STREAM_NAME = "test";
    public static final String REGION = "us-east-1";


    public KinesisProducerHelper() {
        producer = getKinesisProducer()
    }

    /**
     * Here'll walk through some of the config options and create an instance of
     * KinesisProducer, which will be used to put records.
     *
     * @return KinesisProducer instance used to put records.
     */
    protected static KinesisProducer getKinesisProducer() {

        KinesisProducerConfiguration config = new KinesisProducerConfiguration();

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials("X", "X")
        //def credProvider = new DefaultAWSCredentialsProviderChain()
        def credentialsProvider = new AWSStaticCredentialsProvider(awsCredentials)


        config.setRegion(REGION)
        config.setCredentialsProvider(credentialsProvider)
        config.setMaxConnections(1)
        config.setRequestTimeout(60000)
        config.setRecordMaxBufferedTime(15000)

        KinesisProducer producer = new KinesisProducer(config);

        return producer;
    }

    public void putData(streamName, timestamp, key, obj) {

        Charset charset = Charset.forName("UTF-8")
        String dataAsJson = JsonOutput.toJson(obj)+System.lineSeparator()

        byte[] dataAsBytes = dataAsJson.getBytes(charset)


        int dataLength = dataAsBytes.length
        ByteBuffer data = ByteBuffer.wrap(dataAsBytes)


        try {
            if (producer != null) {
                if (obj && dataAsJson && data) {
                    producer.addUserRecord(streamName, "site", data)
                }
            } else {
                println("producer is null")
            }
        }
        finally{
            obj = null
            dataAsJson = ""
            data.clear()
            data = null
        }
    }


}

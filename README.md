<div align="center">
  <a href="https://https://github.com/oslabs-beta/franz/">
    <img src="./assets/franzView_logo.png" alt="Logo" height="300px" width="300px"/> 
  </a>
  <h1>FranzView</h1>
  <p>An open-source Kafka monitoring and management tool built with JavaScript developers in mind!<p>
  <a href="https://github.com/oslabs-beta/ksqljs"><img src="https://img.shields.io/badge/license-MIT-blue"/></a>
  <a href="https://github.com/oslabs-beta/ksqljs/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/franz"></a>
  <a href="https://github.com/oslabs-beta/ksqljs/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/franz"></a>
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/franz">
  
  <a href="https://franzview.com"><strong>franzview.com</strong></a>
</div>

## Table of Contents

1. [About the Project](#about-the-project)
   - [Built With](#built-with)
1. [Getting Started](#getting-started)
   - [Requirements](#requirements)
   - [Installation](#installation)
   - [When you're ready to use FranzView](#when-youre-ready-to-use-franzview)
1. [Contributors](#contributors)
1. [Roadmap](#roadmap)
1. [Prometheus Server and Demo Cluster](#prometheus-server-and-demo-cluster)
1. [License](#license)

## About the Project

FranzView is an open-source web application to help small teams with monitoring and management of Apache Kafka clusters. With FranzView you can monitor key metrics related to broker and topic performance and take actions around them. Through the UI you are able to:

- Monitor key performance metrics in real time by broker or topic and diagnose any issues through different views
- Create and delete topics within a cluster
- Reassign partition replicas to support with load balancing, change replication factor for a topic, and solve for underreplication issues

These features are supported by a GraphQL API for improved performance, for abstraction of PromQL queries, and is easily extendable based on the nuances of your cluster.

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/docs/latest/)
- [Jest](https://jestjs.io/)
- [Prometheus](https://prometheus.io/)
- [KafkaJS](https://kafka.js.org/)

## Getting Started

### Requirements

Before starting setup you'll need to take the following steps:

- Have node installed. FranzView is tested to work on Node 14+.
- If you'd like to use our demo cluster make sure you have Docker Desktop and Docker Compose installed and then check the [demo instructions](#prometheus-server-and-demo-cluster).
- Set up [JMX exporter](https://github.com/prometheus/jmx_exporter) on your cluster. You can find the configuration files and a copy of the JMX exporter jar file in the `configs/jmx_exporter` folder in this repo.
  1. If you're starting your Kafka cluster from the CLI you can set up JMX exporter following these commands:
  ```
  export KAFKA_OPTS='-javaagent:{PATH_TO_JMX_EXPORTER}/jmx-exporter.jar={PORT}:{PATH_TO_JMX_EXPORTER_KAFKA.yml}/kafka.yml'
  ```
  2. Launch or restart your broker as you normally would.
- Have a Prometheus metric server set up with targets setup for each of your brokers. You should use the `prometheus.template.yml` as a template.

Please check the docker-compose files in this repo as examples or to spin up a demo cluster.

### Installation

1. Clone down this repository

```
git clone https://github.com/oslabs-beta/franz
```

2. Create a `.env` file using the template in the `.env.template` file to set the environment variables\*.
3. In the FranzView root directory to install all dependencies.

```
npm install
```

4. Build your version of Franzview

```
npm run build
```

### When you're ready to use FranzView

1. Start the server

```
npm start
```

2. FranzView defaults to running on port 3000. So simply go to http://localhost:3000, and voila view your metrics and start managing your Kafka cluster!

## Contributors

- Chris Dunleavy | [GitHub](https://github.com/christopherdunleavy) | [Linkedin](https://www.linkedin.com/in/christopher-dunleavy-web-dev)
- Ryan Hastie | [GitHub](https://github.com/rbhastie) | [Linkedin](https://www.linkedin.com/in/ryan-hastie)
- Jonathan Haviv | [GitHub](https://github.com/jonathanhaviv) | [Linkedin](https://www.linkedin.com/in/jonathanhaviv)
- Rachelle Maiorca | [GitHub](https://github.com/rmaiorca) | [Linkedin](https://www.linkedin.com/in/rmaiorca)
- Patrick Reid | [GitHub](https://github.com/flyingwolf1701) | [Linkedin](https://www.linkedin.com/in/patrickjreid)

## Roadmap

Franzview is in early stages, but we wanted to get it in the hands of developers as soon as possible to get feedback as soon as possible. Here are features we're working on bringing to FranzView in the near future:

- Additional filtering options for topics and to filter data by time
- The option to auto-deploy a Prometheus server if one isn't passed in
- Additional authentication support for Kafka Clusters
- Log exploration to support with troubleshooting
- Consumer metrics to monitor consumer performance and make improvements
- Frontend querying tools so you can query data that is important to your team

If you don't see a feature that you're looking for listed above, find any bugs, or have another suggestions please feel free to [open an issue](https://github.com/oslabs-beta/franz/issues) and our team will work with you to get it implemented!

Also if you create a custom implementation of FranzView we'd love to see how you're using it!

## Prometheus Server and Demo Cluster

We have a few different docker-compose files depending on your needs.

- If you just need a Kafka cluster (this will spin up a cluster with one zookeeper instance and three brokers ([localhost:9092](localhost:9092), [localhost:9093](localhost:9093), [localhost:9094](localhost:9094)):
  ```
  docker-compose -f docker-compose-kafka-only.yml up -d
  ```
- If you just need a Prometheus server:
  1. Create a `prometheus.yml` file from the template `prometheus.template.yml`
  1. Save it in the `configs/prometheus` folder
  1. Run the following command to spin up a Prometheus server running at http://localhost:9090:
  ```
  docker-compose -f docker-compose-prom-only.yml up -d
  ```
- If you just need want to spin up a Prometheus server + Kafka Cluster.:
  1. We already have a Prometheus config set up, so don't worry about it!
  1. Run the following command to spin up a Prometheus server running at http://localhost:9090 and 3 brokers ([localhost:9092](localhost:9092), [localhost:9093](localhost:9093), [localhost:9094](localhost:9094)):
  ```
  docker-compose -f docker-compose-kafka-prom.yml up -d
  ```

## License

This product is licensed under the MIT License without restriction.

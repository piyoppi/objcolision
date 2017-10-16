FROM ubuntu:16.04

ADD Gemfile /var/www/Gemfile

ENV PATH /root/.rbenv/plugins/ruby-build/bin:$PATH
ENV PATH /root/.rbenv/bin:$PATH
ENV PATH /root/.rbenv/shims:$PATH

RUN apt-get update

RUN apt-get install -y git curl bzip2 build-essential libssl-dev libreadline-dev zlib1g-dev nodejs

WORKDIR /root/
RUN git clone https://github.com/rbenv/rbenv.git /root/.rbenv && \
    git clone https://github.com/rbenv/ruby-build.git /root/.rbenv/plugins/ruby-build
RUN rbenv install 2.4.0

#mysql-client
RUN apt-get install -y libmysqlclient-dev mysql-client

WORKDIR /var/www/
RUN rbenv global 2.4.0
RUN gem install bundler
RUN bundle install --path /usr/local/src/bundles/objcolision


FROM ubuntu:16.04


ENV PATH /root/.rbenv/plugins/ruby-build/bin:$PATH
ENV PATH /root/.rbenv/bin:$PATH
ENV PATH /root/.rbenv/shims:$PATH

RUN apt-get update

RUN apt-get install -y git curl bzip2 build-essential libssl-dev libreadline-dev zlib1g-dev

WORKDIR /root/
RUN git clone https://github.com/rbenv/rbenv.git /root/.rbenv && \
    git clone https://github.com/rbenv/ruby-build.git /root/.rbenv/plugins/ruby-build
RUN rbenv install 2.4.0

#mysql-client
RUN apt-get install -y libmysqlclient-dev

WORKDIR /var/www/
RUN rbenv local 2.4.0
RUN gem install bundler
ADD Gemfile /var/www
RUN bundle install --path /usr/local/src/bundles/objcolision


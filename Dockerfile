# Intermediate image to build the bundle in and install dependencies
FROM node:16-alpine3.17 as builder

WORKDIR /usr/src/app

# Receive the build arguments
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ARG VITE_SUPABASE_SECRET_KEY

# Copy the package.json & package-lock.json into the intermediate "build" image
COPY ./package*.json ./

# The "ci" in npm ci stands for "clean install" used in (CI/CD) environments
# This deletes existing node_modules folder (if one exists) & installs project's dependencies from scratch
# install the dependencies uses the exact versions of dependencies specified in package-lock.json
# ensure that your build process is reproducible and reliable
# faster than npm install. npm install can update package-lock.json file with newer versions of packages,
# which can lead to inconsistent builds
RUN npm ci

COPY ./ ./

# Set the environment variables before running the build command
RUN VITE_SUPABASE_URL=${VITE_SUPABASE_URL} VITE_SUPABASE_KEY=${VITE_SUPABASE_KEY} VITE_SUPABASE_SECRET_KEY=${VITE_SUPABASE_SECRET_KEY} npm run build

# Pull the same Node image and use it as the final (production image)
FROM node:16-alpine3.17 as production

WORKDIR /usr/src/app

# Copy package files again because contents of these files could potentially be modified during the build process
COPY ./package*.json ./

RUN npm ci 

COPY --from=builder /usr/src/app/server ./server
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "server/entry.express" ]
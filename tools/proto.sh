#!/bin/bash
protoc --plugin="../node_modules/.bin/protoc-gen-ts_proto" --ts_proto_out="./generated" --proto_path="./protos" --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages" ./protos/swisstronik/compliance/*.proto

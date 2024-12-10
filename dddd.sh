#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # 색상 초기화

# Node.js가 설치되어 있는지 확인
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js가 설치되어 있지 않습니다. 설치를 시작합니다...${NC}"
    
    # Node.js 설치 (Ubuntu/Debian 기준)
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Node.js 설치 실패. 수동으로 설치해주세요.${NC}"
        exit 1
    fi
fi

# 작업 디렉토리 생성 및 이동
mkdir -p claim_bot
cd claim_bot

# package.json 이 없다면 생성
if [ ! -f package.json ]; then
    echo -e "${GREEN}프로젝트 초기화 중...${NC}"
    npm init -y
fi

# 필요한 패키지 설치
echo -e "${GREEN}필요한 패키지 설치 중...${NC}"
npm install @solana/web3.js bs58

# 실행 권한 확인 및 부여
if [ ! -x claim.js ]; then
    chmod +x claim.js
fi

# 프로그램 실행
echo -e "${GREEN}프로그램을 실행합니다...${NC}"
node dds.js

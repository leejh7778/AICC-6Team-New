-- 테이블 생성(회원가입)
CREATE TABLE hospuser (
    user_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- pn TEXT NOT NULL,
    userID VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    userName VARCHAR(100) NOT NULL,
    email TEXT NOT NULL
);

-- 테이블 생성(병원조회)
CREATE TABLE hosp (
    hosp_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hosp_Name TEXT NOT NULL,
    hosp_Add TEXT NOT NULL,
    hosp_Post TEXT NOT NULL,
    hosp_PN TEXT NOT NULL,
    hosp_X TEXT NOT NULL,
    hosp_Y TEXT NOT NULL
);

-- 테이블 생성(예약)
CREATE TABLE reserv (
    reserv_idx SERIAL PRIMARY KEY,
    user_idx UUID REFERENCES hospUser(user_idx),
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    date TEXT NOT NULL,
    dog BOOLEAN NOT NULL DEFAULT false,
    cat BOOLEAN NOT NULL DEFAULT false,
    etc BOOLEAN NOT NULL DEFAULT false,
    descriptionR TEXT NOT NULL
);

-- 테이블 생성(1대1문의)
CREATE TABLE inquiry (
    inq_idx SERIAL PRIMARY KEY,
    user_idx UUID NOT NULL REFERENCES hospUser(user_idx),
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    descriptionI TEXT NOT NULL,
);

-- 테이블 생성(마이페이지-예약정보 조회)
CREATE TABLE reservInfo (
    rInfo_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_idx UUID REFERENCES hospUser(user_idx),
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    date DATE NOT NULL,                                   
    hosp_idx UUID REFERENCES hosp(hosp_idx),
    dog BOOLEAN NOT NULL DEFAULT false,
    cat BOOLEAN NOT NULL DEFAULT false,
    etc BOOLEAN NOT NULL DEFAULT false,
    descriptionR TEXT NOT NULL
);

-- 테이블 생성(마이페이지-1대1문의 조회)
CREATE TABLE inquiryInfo (
    iInfo_idx UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_idx UUID REFERENCES hospUser(user_idx),
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    hosp_idx UUID REFERENCES hosp(hosp_idx),                
    descriptionI TEXT NOT NULL
);
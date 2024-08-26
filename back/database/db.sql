-- 테이블 생성(회원가입)
CREATE TABLE hospUser (
    user_idx TEXT PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    email TEXT NOT NULL,
    pn TEXT NOT NULL,
    userID VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
    );


-- 테이블 생성(병원조회)
CREATE TABLE hosp (
    hosp_idx TEXT PRIMARY KEY,
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
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    descriptionI TEXT NOT NULL    
    );

-- 테이블 생성(마이페이지-예약정보 조회)
CREATE TABLE reservInfo (
    rInfo_idx TEXT PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    date TEXT NOT NULL,
    hosp_Name TEXT NOT NULL,
    hosp_Add TEXT NOT NULL,
    hosp_PN TEXT NOT NULL,
    dog BOOLEAN NOT NULL DEFAULT false,
    cat BOOLEAN NOT NULL DEFAULT false,
    etc BOOLEAN NOT NULL DEFAULT false,
    descriptionR TEXT NOT NULL
    );

-- 테이블 생성(마이페이지-1대1문의 조회)
CREATE TABLE inquiryInfo (
    iInfo_idx TEXT PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    pn TEXT NOT NULL,
    hosp_Name TEXT NOT NULL,
    hosp_Add TEXT NOT NULL,
    hosp_PN TEXT NOT NULL,
    descriptionI TEXT NOT NULL
    );

-- 테이블 생성(샵)
CREATE TABLE shop (
    item_idx SERIAL PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    itemImg TEXT NOT NULL,
    price TEXT NOT NULL,
    buy BOOLEAN NOT NULL DEFAULT false    
    );



-- 데이터 추가
INSERT INTO hosp (hosp_idx, hosp_Name, hosp_Add, hosp_Post, hosp_PN, hosp_X, hosp_Y) VALUES ('1', '광주동물보호소 부속동물병원', '광주광역시 북구 본촌마을길 27, 동물보호소 (본촌동)', '61027', '062-571-2808', '189132.5237', '191478.4166');

-- 데이터 조회
SELECT * FROM hosp WHERE userId = 'marshall' ORDER BY created_at DESC(ASC);

-- 특정 사용자 데이터 필터 조회
SELECT * FROM hosp WHERE hospital_PN = '010'

-- 데이터 삭제
DELETE FROM hosp WHERE hosp_idx = '1';

-- 데이터 업데이트
UPDATE hosp SET hosp_PN = '변경주소' WHERE hosp_idx = '1';


-- 트리거 함수 생성: updated_at 필드를 현재 시간으로 설정
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 트리거 생성: task 테이블에서 UPDATE가 발생할 때마다 update_updated_at_column 함수를 호출
CREATE TRIGGER update_task_updated_at
BEFORE UPDATE ON task
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- task 테이블의 created_at 필드는 행이 처음 삽입될 때만 설정.
-- updated_at 필드는 행이 업데이트될 때마다 트리거를 통해 현재 시간으로 자동 갱신.
-- BEFORE UPDATE 트리거는 레코드가 업데이트되기 직전에 updated_at 필드를 현재 시간으로 변경.


-- 사용자 테이블 생성
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

<template>
    <div class="login-container">
      <div class="login-form">
        <div class="title">
            <h2>로그인</h2>
        </div>
        <div class="form-group">
            <div class="form-input-weight">
                <span class="input-label">전화번호 :</span>
                <div class="input-box">
                    <span class="phone-separator">010 -</span>
                    <input type="text" maxlength="4" v-model="phone1" class="phone-input" placeholder="0000" />
                    <span class="phone-separator">-</span>
                    <input type="text" maxlength="4" v-model="phone2" class="phone-input" placeholder="0000" />
                </div>
            </div>
            <div class="form-input-weight">  
                <span class="input-label">비밀번호 :</span>
                <input type="password" id="password" v-model="password" class="input-box" placeholder="비밀번호를 입력하세요" />
            </div>  
        </div>
        <button class="login-btn" @click="login">확인</button>
        <button class="signup-btn" @click="signup">회원가입</button>
      </div>
    </div>
</template>
   
<script>
import axios from 'axios';
import router from '@/router';
import 'sweetalert2/dist/sweetalert2.min.css';
import { hashPassword } from '@/services/hash.service';
import { API_BASE_URL } from '@/utils/constants';
export default {
    data() {
        return {
            phone1: '',
            phone2: '',
            password: ''
        }        
    },
    methods: {
        showAlert(message) {
            this.$swal({
                text: message,
                icon: 'warning',
                confirmButtonText: '확인'
            });
        },
        login() {
        // check whether phonenumbers are valid type
        const phone1 = this.phone1.trim();
        const phone2 = this.phone2.trim();
        if (!phone1 || !phone2) { this.showAlert('전화번호를 입력해주세요.'); return; }
        if (!/^\d{3,4}$/.test(phone1) || !/^\d{4}$/.test(phone2)) { this.showAlert('전화번호를 올바르게 입력해주세요.'); return; }
        // check whether password is 
        if (!this.password) { this.showAlert('비밀번호를 입력해주세요.'); return; }
        // hash password with phone third number
        const HashPassword = hashPassword(phone2, this.password);
        const phoneNumber = phone1+phone2;
        // create login data transfer object
        const loginData = {
            user_id: phoneNumber,
            password: HashPassword
        }
        
        // loginData를 백엔드로 전송하는 코드 작성
        axios.post(`${API_BASE_URL}/api/login`, loginData)
            .then(response => {
                console.log('로그인 성공:', response.data);  // 로그인 성공 처리
                // 토큰을 쿠키에 저장
                const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
                document.cookie = `jwt=${token}; path=/`; // 개발에서 사용시
                //document.cookie = `jwt=${token}; path=/; secure`; // HTTPS 환경에서만

                // 게시판 페이지로 이동
                router.push('/board');
        })
        .catch(error => {
            console.error('로그인 실패:', error);  // 로그인 실패 처리
            alert('로그인에 실패했습니다. 입력 정보를 확인해주세요.');
        });
        },
        signup() {
            this.$router.push('/signup');
        }
        
       
    } 
}
</script>
   
<style scoped>
   .login-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
   }
    /* 로그인 전체 box 스타일 */
   .login-form {   
    width: 300px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }
   /* 로그인 제목 스타일 */
   .title {
    display: center;
    align-items: flex-start;
    margin-top: 1px;
    margin-bottom: 5px;
   }
   /* 전화번호/비번 입력box 스타일 */
   .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
   }
   /* 입력box 가로 스타일 */
   .form-input-weight {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
   }
    /* '전화번호:'/'비밀번호:' 입력 스타일 */
    .input-label {
    display: flex;
    justify-content: center;
    width: 80px;
    margin-right: 6px;
    }
   /* 전화번호 입력box 스타일 */
   .input-box {
    display: flex;
    justify-content: center;
    width: 220px;
    align-items: center;
   }
   /* '010-'' 입력 스타일 */
   .phone-separator {
    margin-left: 5px;
    margin-right: 5px;
   }
   /* 전화번호 입력box테두리 스타일 */
   input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 15px;
   }
    /* 전화번호 입력box 사이 간격 스타일 */
   .phone-input {
    width: 50px;
    text-align: center;
   }
    /* 비밀번호 입력box 스타일 */
    .form-password {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
   }
    /* 로그인 버튼 스타일 */
   .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
   }
    /* 회원가입 버튼 스타일 */
   .signup-btn {
    width: 100%;
    padding: 10px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 10px;
   }

</style>